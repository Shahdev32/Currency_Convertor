import React, { useEffect, useState } from 'react';

const URL = "https://v6.exchangerate-api.com/v6/59853b7024b505f62a565670/latest/USD";

function Currency() {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("PKR");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates || {});
      } catch (error) {
        console.log("Error fetching exchange rates: " + error);
      }
    }
    fetchExchangeRates();
  }, []);

  // Currency converter function
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return (amount * rate).toFixed(2);
  };

  // Handle changes in amount1
  const handleAmount1Change = (e) => {
    const value = e.target.value;
    setAmount1(value);
    setAmount2(convertCurrency(value, currency1, currency2));
  };

  // Handle changes in amount2
  const handleAmount2Change = (e) => {
    const value = e.target.value;
    setAmount2(value);
    setAmount1(convertCurrency(value, currency2, currency1));
  };

  // Handle currency selection change
  const handleCurrency1Change = (e) => {
    setCurrency1(e.target.value);
    setAmount2(convertCurrency(amount1, e.target.value, currency2));
  };

  const handleCurrency2Change = (e) => {
    setCurrency2(e.target.value);
    setAmount2(convertCurrency(amount1, currency1, e.target.value));
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Currency Converter</h1>
      <div className="flex flex-col space-y-4">
        
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={amount1}
            onChange={handleAmount1Change}
            className="w-full p-2 border rounded"
            placeholder="Amount"
          />
          <select
            value={currency1}
            onChange={handleCurrency1Change}
            className="p-2 border rounded"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={amount2}
            onChange={handleAmount2Change}
            className="w-full p-2 border rounded"
            placeholder="Converted Amount"
          />
          <select
            value={currency2}
            onChange={handleCurrency2Change}
            className="p-2 border rounded"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Currency;
