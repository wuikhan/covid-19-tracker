import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select,Card ,CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    // The code inside here wil run once when the component loads and not again
    // async -> send a request, wait for it, do something with the info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> COVID - 19 Tracker </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>{" "}
        <div className="app__stats">
          <InfoBox title="Cornovirus cases" cases="234" total="1000" />
          <InfoBox title="Recovered" cases="2345" total="10300" />
          <InfoBox title="Deaths" cases="23456" total="10200" />
        </div>
        <Map />
      </div>
      <Card className="app__right">
<CardContent>
<h3>Live Cases by Country</h3>
<h3> Worldwide new cases</h3>
</CardContent>
      </Card>
    </div>
  );
}

export default App;
