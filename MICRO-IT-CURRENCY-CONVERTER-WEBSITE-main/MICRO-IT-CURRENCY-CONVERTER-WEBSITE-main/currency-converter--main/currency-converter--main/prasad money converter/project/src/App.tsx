import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CurrencyConverter from './components/CurrencyConverter';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <CurrencyConverter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;