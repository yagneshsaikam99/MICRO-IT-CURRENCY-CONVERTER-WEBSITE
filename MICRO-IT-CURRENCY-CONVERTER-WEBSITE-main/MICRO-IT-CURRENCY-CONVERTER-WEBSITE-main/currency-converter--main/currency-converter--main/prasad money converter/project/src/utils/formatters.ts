import { getCurrencyByCode } from './currencies';

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = getCurrencyByCode(currencyCode);
  const symbol = currency?.symbol || '';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'symbol',
      maximumFractionDigits: 4
    }).format(amount);
  } catch (error) {
    // Fallback formatting if the currency code is not supported
    return `${symbol}${amount.toFixed(2)}`;
  }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};