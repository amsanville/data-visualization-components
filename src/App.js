import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import Graph from './components/Graph/Graph.js';

// Same app as in the main branch, except it uses static data instead of fetches to do the displays.

function App() {
  // Cached data from the API
  const [currData, setData] = useState({});

  // State variable tracking which buttons are toggled
  const [toggleButtons, setToggleButtons] = useState([]);
  // State variable tracking which country is selected as the base
  const [countrySelect, setCountrySelect] = useState('');

  function initialization() {
    // Initialization function
    // -Fills out list of countries for the selector and the toggles
    // -Sets up data for initial graph

    // Initial countries displayed on the site
    const initCountries = ['EUR', 'USD', 'AUD', 'CAD'];

    /*
    Fetch code that doesn't work

    // Run initial API request
    let url = 'https://api.exchangeratesapi.io/latest';
    fetch(url)
        .then(response => response.json())
        .then(data => {
          // Add in the base currency    
          let allCountries = data.rates;
          allCountries[data.base] = 1.0;
          
          // Build the toggle buttons
          let tempToggleButtons = []
          let count = 0;
          for(let country of Object.keys(data.rates).sort()){
            if(initCountries.includes(country)){
              tempToggleButtons.push({id: count, text: country, toggled: true, value: data[country.name], height: '100%'});
            } else {
              tempToggleButtons.push({id: count, text: country, toggled: false, value: data[country.name], height: '100%'});
            }
            count++;
          }

          // Calculate the minimum height
          let min = Number.MAX_SAFE_INTEGER;
          for(let country of tempToggleButtons){
            if(country.toggled && min > data.rates[country.text]){
              min = data.rates[country.text];
            }
          }

          // Update the toggled buttons heights
          for(let country of tempToggleButtons){
            if(country.toggled){
              country.height = (min / data.rates[country.text] * 100) + '%';
            }
          }

          // Perform sets at the end
          setData(allCountries);
          setCountrySelect(data.base);
          setToggleButtons(tempToggleButtons);
        });
        */

    // Expected data from the fetch
    let data = {
      base: "EUR",
      rates: {
        USD: 1.1746,
        JPY: 130.03,
        BGN: 1.9558,
        CZK: 26.085,
        DKK: 7.4379,
        GBP: 0.85195,
        HUF: 361.84,
        PLN: 4.6089,
        RON: 4.9088,
        SEK: 10.2753,
        CHF: 1.1099,
        ISK: 148.7,
        NOK: 10.0408,
        HRK: 7.5705,
        RUB: 89.5944,
        TRY: 9.5903,
        AUD: 1.55,
        BRL: 6.6149,
        CAD: 1.4787,
        CNY: 7.7195,
        HKD: 9.1346,
        IDR: 17068.23,
        ILS: 3.915,
        INR: 86.2275,
        KRW: 1328.36,
        MXN: 23.8792,
        MYR: 4.8693,
        NZD: 1.6806,
        PHP: 57.076,
        SGD: 1.5801,
        THB: 36.73,
        ZAR: 17.2074
      }
    };

    // Do what would normally happen in the fetch
    let allCountries = data.rates;
    allCountries[data.base] = 1.0;

    // Build the toggle buttons
    let tempToggleButtons = []
    let count = 0;
    for (let country of Object.keys(data.rates).sort()) {
      if (initCountries.includes(country)) {
        tempToggleButtons.push({ id: count, text: country, toggled: true, value: data[country.name], height: '100%' });
      } else {
        tempToggleButtons.push({ id: count, text: country, toggled: false, value: data[country.name], height: '100%' });
      }
      count++;
    }

    // Calculate the minimum height
    let min = Number.MAX_SAFE_INTEGER;
    for (let country of tempToggleButtons) {
      if (country.toggled && min > data.rates[country.text]) {
        min = data.rates[country.text];
      }
    }

    // Update the toggled buttons heights
    for (let country of tempToggleButtons) {
      if (country.toggled) {
        country.height = (min / data.rates[country.text] * 100) + '%';
      }
    }

    // Perform sets at the end
    setData(allCountries);
    setCountrySelect(data.base);
    setToggleButtons(tempToggleButtons);
  }

  function onToggle(toggledID) {
    // Toggles the bars on and off, correcting the height as necessary
    let tempToggleButtons = toggleButtons;
    let index = tempToggleButtons.map((country) => { return country.id; }).indexOf(toggledID);
    tempToggleButtons[index].toggled = !tempToggleButtons[index].toggled;

    // Update the minimum value
    let min = Number.MAX_SAFE_INTEGER;
    for (let country of tempToggleButtons) {
      if (country.toggled && min > currData[country.text]) {
        min = currData[country.text];
      }
    }

    // Update the height of all toggled buttons
    for (let country of tempToggleButtons) {
      if (country.toggled) {
        country.height = (min / currData[country.text] * 100) + '%';
      }
    }
    // Update with the temporary variable only at the end
    setToggleButtons([...tempToggleButtons]);
  }

  function onSelect(ev) {
    // Update based on changing the select field

    // Pull out the country
    const value = ev.target.value;

    /*
    Fetch that does not work
    // Run initial API request
    let url = 'https://api.exchangeratesapi.io/latest?base=' + value;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          // Add in the selected countries
          let allCountries = data.rates;
          allCountries[data.base] = 1.0;

          // Update the states
          setData(allCountries);
          setCountrySelect(data.base);
        });
    */

    // Changing the base currency is just a matter of dividing the number given by the rate
    // For example: 1 euro is equivalent to 1.1746 USD in the data above, therefore, if the currency is based on USD, this becomes 1 USD is 1/1.1746 = 0.8514 EUR. Thus, when changing base, instead of fetching, I just divide the rates provided. This code is a little messy, because it's ultimately a kludge, but it'll have to do.

    // Base data
    let data = {
      base: "EUR",
      rates: {
        USD: 1.1746,
        JPY: 130.03,
        BGN: 1.9558,
        CZK: 26.085,
        DKK: 7.4379,
        GBP: 0.85195,
        HUF: 361.84,
        PLN: 4.6089,
        RON: 4.9088,
        SEK: 10.2753,
        CHF: 1.1099,
        ISK: 148.7,
        NOK: 10.0408,
        HRK: 7.5705,
        RUB: 89.5944,
        TRY: 9.5903,
        AUD: 1.55,
        BRL: 6.6149,
        CAD: 1.4787,
        CNY: 7.7195,
        HKD: 9.1346,
        IDR: 17068.23,
        ILS: 3.915,
        INR: 86.2275,
        KRW: 1328.36,
        MXN: 23.8792,
        MYR: 4.8693,
        NZD: 1.6806,
        PHP: 57.076,
        SGD: 1.5801,
        THB: 36.73,
        ZAR: 17.2074
      }
    };

    if (value != data.base) {
      // Correction for change of base
      for (const [country, rate] of Object.entries(data.rates)) {
        data.rates[country] = rate / data.rates[value];
      }
      // Add in the old base
      data.rates[data.base] = 1.0 / data.rates[value];

      // Remove the new base
      delete data.rates[value];
      data.base = value;
    }

    // Do what would normally happen in the fetch
    // Add in the selected countries
    let allCountries = data.rates;
    allCountries[data.base] = 1.0;

    // Update the states
    setData(allCountries);
    setCountrySelect(data.base);
  }

  // Initialize with a useEffect
  useEffect(initialization, []);

  return (
    <div className="DataVis">
      <Header
        selected={countrySelect}
        onSelect={onSelect}
        toggleButtons={toggleButtons}
        onToggle={onToggle}
      />
      <Graph
        bars={toggleButtons}
        reference={countrySelect}
      />
    </div>);
}
export default App;