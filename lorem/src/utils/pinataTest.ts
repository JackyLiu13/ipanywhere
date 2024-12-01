import { getPinList } from './pinata';

export const testPinataConnection = async () => {
  try {
    console.log('Testing Pinata connection...');
    
    // Test environment variables
    const envCheck = {
      apiKey: !!import.meta.env.VITE_PINATA_API_KEY,
      secretKey: !!import.meta.env.VITE_PINATA_SECRET_KEY,
      jwt: !!import.meta.env.VITE_PINATA_JWT,
    };
    
    console.log('Environment variables check:', envCheck);

    // Test API connection by getting pin list
    const pins = await getPinList();
    console.log('Successfully connected to Pinata!');
    console.log(`Found ${pins.length} pinned items`);
    
    return {
      success: true,
      envVarsPresent: envCheck,
      pinsCount: pins.length,
    };
    
  } catch (error) {
    console.error('Pinata connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      envVarsPresent: {
        apiKey: !!import.meta.env.VITE_PINATA_API_KEY,
        secretKey: !!import.meta.env.VITE_PINATA_SECRET_KEY,
        jwt: !!import.meta.env.VITE_PINATA_JWT,
      }
    };
  }
};