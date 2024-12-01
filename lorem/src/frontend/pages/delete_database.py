import requests
import sys

# Your Pinata API credentials
PINATA_API_KEY = "490bd861df949042bdac"
PINATA_API_SECRET = "424e78cdfb17e10d11c0b8d5dbf97c8b09228ff305b28b73131e303d821af296"
# Optionally, your JWT token
# PINATA_JWT = "your_jwt_token"

BASE_URL = "https://api.pinata.cloud"

# Headers for authenticating with the Pinata API using API Key and Secret
HEADERS = {
    "pinata_api_key": PINATA_API_KEY,
    "pinata_secret_api_key": PINATA_API_SECRET,
}

# If you prefer to use JWT for authentication, uncomment the following and comment out the above HEADERS
# HEADERS = {
#     "Authorization": f"Bearer {PINATA_JWT}",
# }

def list_pins(page_limit=1000, offset=0):
    """
    Fetches a list of pinned items from Pinata.
    """
    url = f"{BASE_URL}/data/pinList"
    all_pins = []
    while True:
        params = {
            "status": "pinned",
            "pageLimit": page_limit,
            "pageOffset": offset,
        }
        try:
            response = requests.get(url, headers=HEADERS, params=params)
            response.raise_for_status()
            data = response.json()
            pins = data.get("rows", [])
            all_pins.extend(pins)
            if len(pins) < page_limit:
                break
            offset += page_limit
        except requests.RequestException as e:
            print(f"Error fetching pins: {e}")
            sys.exit(1)
    return all_pins

def delete_pin(ipfs_hash):
    """
    Deletes a pin from Pinata using its IPFS hash.
    """
    url = f"{BASE_URL}/pinning/unpin/{ipfs_hash}"
    try:
        response = requests.delete(url, headers=HEADERS)
        if response.status_code == 200:
            print(f"Successfully unpinned: {ipfs_hash}")
        else:
            print(f"Failed to unpin: {ipfs_hash}. Error: {response.text}")
    except requests.RequestException as e:
        print(f"Error unpinning {ipfs_hash}: {e}")

def delete_all_pins():
    """
    Deletes all pinned items without user interaction.
    """
    pins = list_pins()
    if not pins:
        print("No pinned items found.")
        sys.exit(0)
    
    print(f"Found {len(pins)} pinned items. Deleting all...")
    
    for pin in pins:
        ipfs_hash = pin.get("ipfs_pin_hash")
        delete_pin(ipfs_hash)
    
    print("All pinned items have been deleted.")

if __name__ == "__main__":
    # Uncomment the following lines if you want to add a final confirmation prompt
    # confirm = input(f"Are you sure you want to delete all {len(list_pins())} pinned items? This action cannot be undone. (y/n): ")
    # if confirm.lower() == 'y':
    #     delete_all_pins()
    # else:
    #     print("Deletion canceled.")
    #     sys.exit(0)
    
    # Automatically delete all pins without confirmation
    delete_all_pins()
