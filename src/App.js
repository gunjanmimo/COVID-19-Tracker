import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent, } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(["worldwide"])
  const [countryInfo, setCountryInfo] = useState({})
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  })
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
    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[countryCode]
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then(data => {
        setCountry(countryCode)
        // all data of country...
        setCountryInfo(data)
      })

  }
  console.log("country info: ", countryInfo)
  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Corona Virus cases" cases={countryInfo.todayCases} total={countryInfo.active} />
          {/* InforBoxes title= corona virus recovery */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* InforBoxes title = corona virus death*/}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        {/*Map*/}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by Country</h3>
          {/* Table */}
          <h3>World wide new cases</h3>
          {/* Graph */}
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
