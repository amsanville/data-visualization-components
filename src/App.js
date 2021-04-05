import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import Graph from './components/Graph/Graph.js';

function App() {
  // Cached data from the API
  const [currData, setData] = useState({});

  // State variable tracking which buttons are toggled
  const [toggleButtons, setToggleButtons] = useState([]);
  // State variable tracking which country is selected as the base
  const [countrySelect, setCountrySelect] = useState('');
  
  function initialization(){
    // Initialization function
    // -Fills out list of countries for the selector and the toggles
    // -Sets up data for initial graph

    // Initial countries displayed on the site
    const initCountries = ['EUR', 'USD', 'AUD', 'CAD'];

    // Run initial API request
    let url = 'https://api.exchangerate.host/latest?source=ecb';
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
              tempToggleButtons.push({id: count, text: country, toggled: true, value: data.rates[country], height: '100%'});
            } else {
              tempToggleButtons.push({id: count, text: country, toggled: false, value: data.rates[country], height: '100%'});
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
  }

  function onToggle(toggledID){
    // Toggles the bars on and off, correcting the height as necessary
    let tempToggleButtons = toggleButtons;
    let index = tempToggleButtons.map((country) => {return country.id;}).indexOf(toggledID);
    tempToggleButtons[index].toggled = !tempToggleButtons[index].toggled;

    // Update the minimum value
    let min = Number.MAX_SAFE_INTEGER;
    for(let country of tempToggleButtons){
      if(country.toggled && min > currData[country.text]){
        min = currData[country.text];
      }
    }

    // Update the height of all toggled buttons
    for(let country of tempToggleButtons){
      if(country.toggled){
        country.height = (min / currData[country.text] * 100) + '%';
      }
    }
    // Update with the temporary variable only at the end
    setToggleButtons([...tempToggleButtons]);
  }

  function onSelect(ev){
    // Update based on changing the select field

    // Pull out the country
    const value = ev.target.value;

    // Run initial API request
    let url = 'https://api.exchangerate.host/latest?source=ecb&base=' + value;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          // Add in the selected countries
          let allCountries = data.rates;
          allCountries[data.base] = 1.0;

          // Update the states
          let tempToggleButtons = toggleButtons;
          for(const button of tempToggleButtons){
            button.value = data.rates[button.text];
          }
          setToggleButtons(tempToggleButtons);
          setData(allCountries);
          setCountrySelect(data.base);
        });
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