import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface CurrencySwapProps {
  onSwap: () => void;
}

const CurrencySwap: React.FC<CurrencySwapProps> = ({ onSwap }) => {
  return (
    <button
      onClick={onSwap}
      className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-600 group"
      aria-label="Swap currencies"
    >
      <ArrowUpDown 
        className="text-blue-600 dark:text-blue-400 transform group-hover:rotate-180 transition-transform duration-300" 
        size={24} 
      />
    </button>
  );
};

export default CurrencySwap;