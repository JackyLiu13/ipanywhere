use core::starknet::ContractAddress;

//defining the struct for the IPObject
#[derive(Drop, Serde, starknet::Store, Clone)]
struct IPObj {
    name: felt252,        // Name of the intellectual property
    description: felt252, // Description of the IP -- byte array; longer text
    price: u256,          // Price of the IP (using u256 for larger number support)
    ipfs_hash: felt252,   // IPFS hash of the PDF document -- big int from the front end;
    owner: ContractAddress,  // Add owner field
    for_sale: bool,  // Add for_sale field
    // Add new fields for rental
    rental_price: u256,     // Price per day for renting
    for_rent: bool,         // Whether IP is available for rent
    rented_to: ContractAddress,  // Current renter (zero address if not rented)
    rental_end_time: u64,   // When rental expires
    // New fields
    original_renter: ContractAddress,  // Original renter for subleasing tracking
    sublease_price: u256,   // Price if subleased
    is_subleased: bool      // Whether currently subleased
}

// Add ERC20 interface
#[starknet::interface]
trait IERC20<TContractState> {
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(
        ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256
    ) -> bool;
}

// Update IPRegistry interface with initialization function
#[starknet::interface]
trait IIPRegistry<TContractState> {
    fn set(ref self: TContractState, name: felt252, description: felt252, price: u256, ipfs_hash: felt252);
    fn get(self: @TContractState, address: ContractAddress) -> (felt252, felt252, u256, felt252, ContractAddress);
    fn get_by_name(self: @TContractState, name: felt252) -> IPObj;
    fn hello(self: @TContractState) -> felt252;
    fn transfer_ownership(ref self: TContractState, ip_name: felt252, new_owner: ContractAddress);
    fn get_owner(self: @TContractState, ip_name: felt252) -> ContractAddress;
    fn list_for_sale(ref self: TContractState, ip_name: felt252, price: u256);
    fn remove_from_sale(ref self: TContractState, ip_name: felt252);
    fn buy_ip(ref self: TContractState, ip_name: felt252);
    
    // New function to set payment token
    fn initialize(ref self: TContractState, payment_token: ContractAddress);
    
    // New functions for rental
    fn list_for_rent(ref self: TContractState, ip_name: felt252, daily_price: u256);
    fn remove_from_rent(ref self: TContractState, ip_name: felt252);
    fn rent_ip(ref self: TContractState, ip_name: felt252, days: u64);
    fn end_rental(ref self: TContractState, ip_name: felt252);
    fn sublease_ip(ref self: TContractState, ip_name: felt252, sublease_price: u256);
    fn rent_subleased_ip(ref self: TContractState, ip_name: felt252, days: u64);
    fn end_sublease(ref self: TContractState, ip_name: felt252);
    
    // New function to get recent IPs
    fn get_recent_ips(self: @TContractState, count: u32) -> Array<IPObj>;
}

#[starknet::contract]
mod IPRegistry {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };
    use core::starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use super::{IPObj, IERC20Dispatcher, IERC20DispatcherTrait};

    #[storage]
    struct Storage {
        ip_registry: Map<ContractAddress, IPObj>,
        ip_name_to_owner: Map<felt252, ContractAddress>, // Map IP names to owners
        payment_token: ContractAddress, // Add payment token address storage
        // New fields for tracking recent IPs
        ip_count: u32,  // Total number of IPs registered
        ip_index: Map<u32, felt252>,  // Maps index to IP name for ordered access
    }
    
    #[abi(embed_v0)]
    impl IPRegistryImpl of super::IIPRegistry<ContractState> {
        //set the IPObj in the registry put the primitive parameters in stead first ** 
        fn set(ref self: ContractState, name: felt252, description: felt252, price: u256, ipfs_hash: felt252) {
            let caller = get_caller_address();
            let ip = IPObj { 
                name, 
                description, 
                price, 
                ipfs_hash,
                owner: caller,
                for_sale: false,  // Initialize as not for sale
                rental_price: 0.into(),
                for_rent: false,
                rented_to: 0.try_into().unwrap(),
                rental_end_time: 0,
                original_renter: 0.try_into().unwrap(),
                sublease_price: 0.into(),
                is_subleased: false
            };
            
            // Store IP
            self.ip_registry.entry(caller).write(ip);
            self.ip_name_to_owner.entry(name).write(caller);
            
            // Track insertion order
            let current_count = self.ip_count.read();
            self.ip_index.entry(current_count).write(name);
            self.ip_count.write(current_count + 1);
        }

        //get the IPObj from the registry | return the string values break it down
        fn get(self: @ContractState, address: ContractAddress) -> (felt252, felt252, u256, felt252, ContractAddress) {
            let ip = self.ip_registry.entry(address).read();
            (ip.name, ip.description, ip.price, ip.ipfs_hash, ip.owner)
        }   

        fn get_by_name(self: @ContractState, name: felt252) -> IPObj {
            let owner = self.ip_name_to_owner.entry(name).read();
            let ip = self.ip_registry.entry(owner).read();
            assert(ip.name == name, 'IP not found');
            ip
        }

        fn hello(self: @ContractState) -> felt252 {
            'Hello'
        }

        fn transfer_ownership(ref self: ContractState, ip_name: felt252, new_owner: ContractAddress) {
            // Get current owner
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            // Verify caller is current owner
            assert(caller == current_owner, 'Not the owner');
            
            // Get the IP object
            let mut ip = self.ip_registry.entry(current_owner).read();
            
            // Update owner
            ip.owner = new_owner;
            
            // Clone ip before first write
            let ip_clone = ip.clone();
            
            // Remove IP from current owner's registry
            self.ip_registry.entry(current_owner).write(ip_clone);
            
            // Add IP to new owner's registry
            self.ip_registry.entry(new_owner).write(ip);
            
            // Update name to owner mapping
            self.ip_name_to_owner.entry(ip_name).write(new_owner);
        }

        fn get_owner(self: @ContractState, ip_name: felt252) -> ContractAddress {
            self.ip_name_to_owner.entry(ip_name).read()
        }

        // List IP for sale
        fn list_for_sale(ref self: ContractState, ip_name: felt252, price: u256) {
            // Get current owner
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            // Verify caller is owner
            assert(caller == current_owner, 'Not the owner');
            
            // Get and update IP object
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            ip.for_sale = true;
            ip.price = price;
            
            // Update storage
            self.ip_registry.entry(current_owner).write(ip);
        }

        // Remove IP from sale
        fn remove_from_sale(ref self: ContractState, ip_name: felt252) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            assert(caller == current_owner, 'Not the owner');
            
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            ip.for_sale = false;
            
            self.ip_registry.entry(current_owner).write(ip);
        }

        // Buy IP
        fn buy_ip(ref self: ContractState, ip_name: felt252) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let buyer = get_caller_address();
            
            // Verify buyer is not current owner
            assert(buyer != current_owner, 'Already owner');
            
            // Get IP object
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            // Cannot buy if currently rented
            assert(ip.rented_to == 0.try_into().unwrap(), 'IP is currently rented');
            assert(ip.for_sale == true, 'IP not for sale');
            
            // Handle payment
            let payment_token = self.payment_token.read();
            let token = IERC20Dispatcher { contract_address: payment_token };
            
            // Transfer tokens from buyer to current owner
            let success = token.transfer_from(buyer, current_owner, ip.price);
            assert(success, 'Payment failed');
            
            // Update IP object
            ip.owner = buyer;
            ip.for_sale = false;
            
            // Remove IP from current owner
            self.ip_registry.entry(current_owner).write(ip.clone());
            
            // Add IP to new owner
            self.ip_registry.entry(buyer).write(ip);
            
            // Update name to owner mapping
            self.ip_name_to_owner.entry(ip_name).write(buyer);
        }

        fn initialize(ref self: ContractState, payment_token: ContractAddress) {
            // Check if address is zero by comparing with the zero address
            let zero_address: ContractAddress = 0.try_into().unwrap();
            assert(payment_token != zero_address, 'Invalid token address');
            self.payment_token.write(payment_token);
        }

        // List IP for rent
        fn list_for_rent(ref self: ContractState, ip_name: felt252, daily_price: u256) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            // Verify caller is owner
            assert(caller == current_owner, 'Not the owner');
            
            // Get and update IP object
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            assert(!ip.for_sale, 'IP is for sale');
            assert(ip.rented_to == 0.try_into().unwrap(), 'IP is currently rented');
            
            ip.for_rent = true;
            ip.rental_price = daily_price;
            
            // Update storage
            self.ip_registry.entry(current_owner).write(ip);
        }

        // Remove IP from rent listing
        fn remove_from_rent(ref self: ContractState, ip_name: felt252) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            assert(caller == current_owner, 'Not the owner');
            
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            assert(ip.rented_to == 0.try_into().unwrap(), 'IP is currently rented');
            
            ip.for_rent = false;
            ip.rental_price = 0.into();
            
            self.ip_registry.entry(current_owner).write(ip);
        }

        // Rent an IP
        fn rent_ip(ref self: ContractState, ip_name: felt252, days: u64) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let renter = get_caller_address();
            
            // Verify renter is not the owner
            assert(renter != current_owner, 'Owner cannot rent');
            
            // Get IP object
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            // Verify IP is available for rent
            assert(ip.for_rent == true, 'IP not for rent');
            assert(ip.rented_to == 0.try_into().unwrap(), 'IP already rented');
            
            // Calculate total rental cost
            let total_cost = ip.rental_price * days.into();
            
            // Handle payment
            let payment_token = self.payment_token.read();
            let token = IERC20Dispatcher { contract_address: payment_token };
            
            // Transfer tokens from renter to owner
            let success = token.transfer_from(renter, current_owner, total_cost);
            assert(success, 'Payment failed');
            
            // Update IP rental status
            ip.rented_to = renter;
            let current_time = get_block_timestamp();
            ip.rental_end_time = current_time + (days * 86400); // 86400 seconds in a day
            
            // Update storage
            self.ip_registry.entry(current_owner).write(ip);
        }

        // End rental (can be called by owner or after rental period expires)
        fn end_rental(ref self: ContractState, ip_name: felt252) {
            let current_owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            let mut ip = self.ip_registry.entry(current_owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            // Check if caller is owner or if rental period has expired
            let current_time = get_block_timestamp();
            assert(
                caller == current_owner || current_time >= ip.rental_end_time,
                'Not authorized or rental active'
            );
            
            // Reset rental status
            ip.rented_to = 0.try_into().unwrap();
            ip.rental_end_time = 0;
            
            // Update storage
            self.ip_registry.entry(current_owner).write(ip);
        }

        // Sublease an IP you're renting
        fn sublease_ip(ref self: ContractState, ip_name: felt252, sublease_price: u256) {
            let owner = self.ip_name_to_owner.entry(ip_name).read();
            let current_renter = get_caller_address();
            
            let mut ip = self.ip_registry.entry(owner).read();
            assert(ip.name == ip_name, 'IP not found');
            
            // Verify caller is current renter
            assert(ip.rented_to == current_renter, 'Not the current renter');
            assert(!ip.is_subleased, 'Already subleased');
            
            // Cannot sublease if rental period is too short
            let current_time = get_block_timestamp();
            assert(current_time < ip.rental_end_time, 'Rental period expired');
            
            ip.sublease_price = sublease_price;
            ip.is_subleased = true;
            ip.original_renter = current_renter;
            
            self.ip_registry.entry(owner).write(ip);
        }

        // Rent a subleased IP
        fn rent_subleased_ip(ref self: ContractState, ip_name: felt252, days: u64) {
            let owner = self.ip_name_to_owner.entry(ip_name).read();
            let subrenter = get_caller_address();
            
            let mut ip = self.ip_registry.entry(owner).read();
            assert(ip.name == ip_name, 'IP not found');
            assert(ip.is_subleased, 'IP not available for sublease');
            
            // Calculate end time - cannot exceed original rental period
            let current_time = get_block_timestamp();
            let requested_end_time = current_time + (days * 86400);
            assert(requested_end_time <= ip.rental_end_time, 'Exceeds original rental');
            
            // Handle sublease payment to original renter
            let payment_token = self.payment_token.read();
            let token = IERC20Dispatcher { contract_address: payment_token };
            
            let total_cost = ip.sublease_price * days.into();
            let success = token.transfer_from(subrenter, ip.original_renter, total_cost);
            assert(success, 'Sublease payment failed');
            
            // Update rental status
            ip.rented_to = subrenter;
            
            self.ip_registry.entry(owner).write(ip);
        }

        // End a sublease (can be called by original renter or after sublease expires)
        fn end_sublease(ref self: ContractState, ip_name: felt252) {
            let owner = self.ip_name_to_owner.entry(ip_name).read();
            let caller = get_caller_address();
            
            let mut ip = self.ip_registry.entry(owner).read();
            assert(ip.name == ip_name, 'IP not found');
            assert(ip.is_subleased, 'Not subleased');
            
            // Only original renter or expired sublease
            assert(
                caller == ip.original_renter || get_block_timestamp() >= ip.rental_end_time,
                'Not authorized'
            );
            
            // Reset sublease status
            ip.rented_to = ip.original_renter;
            ip.is_subleased = false;
            ip.sublease_price = 0.into();
            
            self.ip_registry.entry(owner).write(ip);
        }

        // New function to get recent IPs
        fn get_recent_ips(self: @ContractState, count: u32) -> Array<IPObj> {
            let mut result = ArrayTrait::new();
            let total_ips = self.ip_count.read();
            
            // Calculate how many IPs to return (minimum of count or total_ips)
            let mut remaining = if count < total_ips {
                count
            } else {
                total_ips
            };
            
            // Start from the most recent IP and work backwards
            let mut current_index = if total_ips > 0 {
                total_ips - 1
            } else {
                return result;
            };

            loop {
                if remaining == 0 {
                    break;
                }
                
                // Get IP name at current index
                let ip_name = self.ip_index.entry(current_index).read();
                // Get owner of the IP
                let owner = self.ip_name_to_owner.entry(ip_name).read();
                // Get IP object
                let ip = self.ip_registry.entry(owner).read();
                
                // Add to result array
                result.append(ip);
                
                remaining -= 1;
                if current_index == 0 {
                    break;
                }
                current_index -= 1;
            };
            
            result
        }
    }
}



