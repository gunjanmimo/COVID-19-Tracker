import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, } from "@material-ui/core";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([])
  // https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          setCountries(countries);
        })
    }
    getCountriesData()
  }, [])

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined">
            {/*loop through all the countries*/}
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Worldwide</MenuItem>
<MenuItem value="worldwide">Worldwide</MenuItem> */}

          </Select>
        </FormControl>
      </div>

      {/* Header */}

      {/* Title+ Select input dropdown field */}
      {/* InfoBoxes */}
      {/* InforBoxes */}
      {/* InforBoxes */}
      {/* Table */}
      {/* Graph */}
    </div>
  );
}

export default App;
