import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, } from "@material-ui/core";
import InfoBox from "./InfoBox";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(["worldwide"])
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
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
  }
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined"
            onChange={onCountryChange}
            value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* InfoBoxes title= corona virus cases */}
        <InfoBox title="Corona Virus cases" cases={4000} total={200} />
        {/* InforBoxes title= corona virus recovery */}
        <InfoBox title="Recovered" cases={4000} total={200} />

        {/* InforBoxes title = corona virus death*/}
        <InfoBox title="Deaths" cases={4000} total={200} />

      </div>

      {/* Table */}
      {/* Graph */}
    </div>
  );
}

export default App;
