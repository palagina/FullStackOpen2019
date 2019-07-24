import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import Button from "./components/Button";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const searchFilter = () =>
    countries.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const countriesList = () => {
    if (search === "") {
      return <div>Enter something to the search field</div>;
    } else if (searchFilter().length === 1) {
      return <Country country={searchFilter()[0]} />;
    } else if (searchFilter().length > 10) {
      return <div>Too many matches</div>;
    }
    return searchFilter().map(country => (
      <div key={country.name}>
        <Button country={country} />
      </div>
    ));
  };

  return (
    <div className="App">
      <form>
        <input placeholder="Search.." value={search} onChange={handleSearch} />
      </form>
      <div>{countriesList()}</div>
    </div>
  );
};

export default App;
