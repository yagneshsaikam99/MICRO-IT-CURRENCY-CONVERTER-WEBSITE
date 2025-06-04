import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface ConversionResultProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  loading: boolean;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  result,
  loading
}) => {
  const fromAmount = formatCurrency(amount, fromCurrency);
  const toAmount = formatCurrency(result, toCurrency);
  
  return (
    <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      ) : (
        <>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {toAmount}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {fromAmount} = {toAmount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Exchange rate updated: {new Date().toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
};

export default ConversionResult;