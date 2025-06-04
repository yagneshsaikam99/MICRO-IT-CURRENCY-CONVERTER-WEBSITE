import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { HistoryItem } from '../types';
import { History, Trash2 } from 'lucide-react';

interface ConversionHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history, onClear }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
          <History size={20} className="text-blue-600 dark:text-blue-400" />
          Conversion History
        </h2>
        <button
          onClick={onClear}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 text-sm"
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                From
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                To
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {item.date.toLocaleString(undefined, { 
                    month: 'short', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.fromCurrency}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.toCurrency}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {formatCurrency(item.amount, item.fromCurrency)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                  {formatCurrency(item.result, item.toCurrency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConversionHistory;