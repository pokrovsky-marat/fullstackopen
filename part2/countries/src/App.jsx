// In order to safely run app use command bellow wit your key from https://openweathermap.org/
// export VITE_SOME_KEY=your_key && npm run dev // For Linux/macOS/windows Bash

const api_key = import.meta.env.VITE_SOME_KEY;
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const SingleCountry = ({ country, weather, setWeather }) => {
  const [lat, lng] = country.capitalInfo.latlng;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [url]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Wheather in {country.capital}</h2>
      <div>Temperature {weather?.main?.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        alt=""
      />
      <div>Wind {weather?.wind?.speed} m/s</div>
    </div>
  );
};
const ShowCountries = ({ filtered, setSearchText, weather, setWeather }) => {
  if (filtered.length === 0) return;
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (filtered.length <= 10 && filtered.length > 1) {
    return (
      <div>
        {filtered.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => {
                setSearchText(country.name.common);
              }}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (filtered.length === 1) {
    let country = filtered[0];
    return (
      <SingleCountry
        country={country}
        weather={weather}
        setWeather={setWeather}
      />
    );
  }
};
const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleInput = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    axios.get(`${baseUrl}all`).then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div>
      find countries
      <input onChange={handleInput} type="text" value={searchText} />
      <ShowCountries
        filtered={filteredCountries}
        setSearchText={setSearchText}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
};

export default App;
