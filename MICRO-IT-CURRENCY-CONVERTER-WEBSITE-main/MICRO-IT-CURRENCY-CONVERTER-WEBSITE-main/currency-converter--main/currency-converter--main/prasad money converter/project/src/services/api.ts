import { currencies } from '../utils/currencies';

// In a real application, you would use an actual API key
// For this demo, we're simulating exchange rates
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  try {
    // For demo purposes, we'll use fixed rates based on real market data
    // In a real app, use the actual API:
    // const response = await fetch(API_BASE_URL);
    // const data = await response.json();
    // return data.rates;
    
    return simulateExchangeRates();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};

// Simulate exchange rates using realistic market data
const simulateExchangeRates = (): Record<string, number> => {
  // Base rates as of March 2024 (approximate)
  const baseRates: Record<string, number> = {
    USD: 1.0000,
    EUR: 0.9177,
    GBP: 0.7859,
    JPY: 149.95,
    AUD: 1.5234,
    CAD: 1.3545,
    CHF: 0.8834,
    CNY: 7.1985,
    HKD: 7.8223,
    NZD: 1.6397,
    SEK: 10.3845,
    SGD: 1.3397,
    NOK: 10.5123,
    MXN: 16.7234,
    INR: 82.8234,
    BRL: 4.9723,
    RUB: 91.2345,
    ZAR: 18.9234,
    TRY: 31.8234,
    AED: 3.6725,
    SAR: 3.7500,
    THB: 35.8234,
    KRW: 1323.45,
    PLN: 3.9423,
    ILS: 3.6234,
    DKK: 6.8423,
    MYR: 4.7234,
    IDR: 15623.45,
    PHP: 55.8234,
    HUF: 358.2345
  };
  
  // Return the fixed rates
  return baseRates;
};