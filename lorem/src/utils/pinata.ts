import axios from 'axios';

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

if (!PINATA_API_KEY || !PINATA_SECRET_KEY || !PINATA_JWT) {
  throw new Error('Missing Pinata API credentials in environment variables');
}

// Function to upload a file to IPFS via Pinata
export const uploadToPinata = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        company: 'PatentMarketplace',
        type: file.type
      }
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          'Content-Type': `multipart/form-data`,
        }
      }
    );

    return {
      ipfsHash: res.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
      gatewayUrl: `https://ipfs.io/ipfs/${res.data.IpfsHash}`
    };
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
};

// Function to upload JSON data to IPFS via Pinata
export const uploadJSONToPinata = async (jsonData: any, metadata?: any) => {
  try {
    const pinataBody = {
      pinataContent: jsonData,
      pinataMetadata: {
        name: metadata?.name || 'Patent Data',
        keyvalues: {
          company: 'PatentMarketplace',
          patentNumber: jsonData.patentNumber,
          category: jsonData.category,
          subcategory: jsonData.subcategory,
          ...metadata?.keyvalues
        }
      },
      pinataOptions: {
        cidVersion: 0
      }
    };

    console.log('Uploading to Pinata with:', pinataBody);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      pinataBody,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Pinata upload response:', response.data);

    return {
      ipfsHash: response.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      gatewayUrl: `https://ipfs.io/ipfs/${response.data.IpfsHash}`
    };
  } catch (error) {
    console.error('Error uploading JSON to Pinata:', error);
    throw error;
  }
};

// Function to retrieve data from IPFS via Pinata gateway
export const getFromPinata = async (ipfsHash: string) => {
  try {
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Pinata:', error);
    throw error;
  }
};

// Function to unpin file from Pinata
export const unpinFromPinata = async (ipfsHash: string) => {
  try {
    await axios.delete(
      `https://api.pinata.cloud/pinning/unpin/${ipfsHash}`,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`
        }
      }
    );
    return true;
  } catch (error) {
    console.error('Error unpinning from Pinata:', error);
    throw error;
  }
};

// Function to get pin list
export const getPinList = async () => {
  try {
    console.log('Fetching pin list from Pinata...');
    const response = await axios.get(
      'https://api.pinata.cloud/data/pinList',
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`
        },
        params: {
          status: 'pinned',
          metadata: JSON.stringify({
            keyvalues: {
              company: {
                value: 'PatentMarketplace',
                op: 'eq'
              }
            }
          })
        }
      }
    );

    console.log('Pinata raw response:', response.data);

    if (!response.data.rows) {
      console.error('No rows found in Pinata response');
      return [];
    }

    console.log('Patent pins:', response.data.rows);
    return response.data.rows;

  } catch (error) {
    console.error('Error getting pin list from Pinata:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
    }
    throw error;
  }
};

// Function to test Pinata connection
export const testPinataConnection = async () => {
  try {
    const response = await axios.get(
      'https://api.pinata.cloud/data/testAuthentication',
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error testing Pinata connection:', error);
    throw error;
  }
};