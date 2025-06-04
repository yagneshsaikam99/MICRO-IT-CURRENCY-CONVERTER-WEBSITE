import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 transition-colors duration-300 p-4 text-center text-gray-600 dark:text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {currentYear} CurrencyPro. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="text-red-500" size={16} />
            <span>using React & TailwindCSS</span>
          </div>
          <p>Rates updated every hour</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;