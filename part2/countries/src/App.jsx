import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const ShowCountries = ({ filtered, setSearchText }) => {
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
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  }
};
const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);
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
      />
    </div>
  );
};

export default App;
