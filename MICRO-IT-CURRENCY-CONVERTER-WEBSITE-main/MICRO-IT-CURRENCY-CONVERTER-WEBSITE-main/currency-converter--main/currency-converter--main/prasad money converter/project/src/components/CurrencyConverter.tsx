import React, { useState, useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import CurrencySwap from './CurrencySwap';
import ConversionResult from './ConversionResult';
import ConversionHistory from './ConversionHistory';
import { fetchExchangeRates } from '../services/api';
import { useAnimatedValue } from '../hooks/useAnimatedValue';
import { HistoryItem } from '../types';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const { animatedValue, startAnimation } = useAnimatedValue();

  // Load exchange rates on component mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        setLoading(true);
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
        setError(null);
      } catch (err) {
        setError('Failed to load exchange rates. Please try again later.');
        console.error('Error fetching exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExchangeRates();
    // Refresh rates every hour
    const intervalId = setInterval(loadExchangeRates, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Calculate conversion when inputs change
  useEffect(() => {
    if (!loading && Object.keys(exchangeRates).length > 0) {
      const numericAmount = parseFloat(amount) || 0;
      const fromRate = exchangeRates[fromCurrency] || 1;
      const toRate = exchangeRates[toCurrency] || 1;
      const result = (numericAmount * toRate) / fromRate;
      
      startAnimation(result);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates, loading]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConversion = () => {
    const numericAmount = parseFloat(amount) || 0;
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    const convertedAmount = (numericAmount * toRate) / fromRate;
    
    // Add to history
    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      fromCurrency,
      toCurrency,
      amount: numericAmount,
      result: convertedAmount,
      date: new Date()
    };
    
    setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-colors duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Currency Converter
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <CurrencyInput 
            label="Amount"
            value={amount}
            onChange={setAmount}
            currencyCode={fromCurrency}
            onCurrencyChange={setFromCurrency}
            exchangeRates={exchangeRates}
            isAmount={true}
          />
          
          <div className="flex justify-center my-2">
            <CurrencySwap onSwap={handleSwapCurrencies} />
          </div>
          
          <CurrencyInput 
            label="Convert to"
            value=""
            onChange={() => {}}
            currencyCode={toCurrency}
            onCurrencyChange={setToCurrency}
            exchangeRates={exchangeRates}
            isAmount={false}
            disabled
          />
          
          <ConversionResult 
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={parseFloat(amount) || 0}
            result={animatedValue}
            loading={loading}
          />
          
          <button
            onClick={handleConversion}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={loading || !amount}
          >
            {loading ? 'Loading...' : 'Convert'}
          </button>
        </div>
      </div>
      
      {history.length > 0 && (
        <ConversionHistory 
          history={history} 
          onClear={clearHistory}
        />
      )}
    </div>
  );
};

export default CurrencyConverter;