/**
 * API Configuration
 * 
 * This file controls whether the app uses mock data or real API calls.
 * 
 * To switch to real API:
 * 1. Set NEXT_PUBLIC_USE_MOCK_API=false in .env.local
 * 2. Ensure Pet_BE backend is running
 * 
 * To use mock data (default for development):
 * 1. Set NEXT_PUBLIC_USE_MOCK_API=true in .env.local (or don't set it)
 */

// Default to mock API in development, real API in production
export const USE_MOCK_API =
    process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ||
    process.env.NEXT_PUBLIC_USE_MOCK_API === undefined;

// Export for debugging
export const getApiMode = () => USE_MOCK_API ? 'MOCK' : 'REAL';

console.log(`[API Config] Mode: ${getApiMode()}`);
