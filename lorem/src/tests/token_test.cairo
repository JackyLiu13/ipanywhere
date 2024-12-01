#[cfg(test)]
mod tests {
    use super::Token;
    use starknet::ContractAddress;
    use starknet::testing::set_caller_address;

    #[test]
    fn test_constructor() {
        let name = 'MyToken';
        let symbol = 'MTK';
        let decimals = 18_u8;
        let initial_supply = 1000_u256;
        let recipient = ContractAddress::from(123);

        Token::constructor(name, symbol, decimals, initial_supply, recipient);

        assert(Token::get_name() == name, 'Wrong name');
        assert(Token::get_symbol() == symbol, 'Wrong symbol');
        assert(Token::get_decimals() == decimals, 'Wrong decimals');
        assert(Token::get_total_supply() == initial_supply, 'Wrong total supply');
        assert(Token::balance_of(recipient) == initial_supply, 'Wrong balance');
    }

    #[test]
    fn test_transfer() {
        let initial_supply = 1000_u256;
        let sender = ContractAddress::from(123);
        let recipient = ContractAddress::from(456);
        let transfer_amount = 100_u256;

        Token::constructor('', '', 18_u8, initial_supply, sender);
        set_caller_address(sender);

        assert(Token::transfer(recipient, transfer_amount), 'Transfer failed');
        assert(Token::balance_of(sender) == initial_supply - transfer_amount, 'Wrong sender balance');
        assert(Token::balance_of(recipient) == transfer_amount, 'Wrong recipient balance');
    }
}