import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {

  const languages = () => {
    let list = []
    country.languages.forEach(language => {
      list = list.concat(language.name)
    })
    return (
      list.map(item => <li key={item}>{item}</li>)
      )
  }

  return (
    <div>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <b>Languages</b>
      <div>{languages()}</div>
      <p></p>
      <img src={country.flag} width="100px" alt="flag"></img>
      <Weather capital={country.capital}/>
      <br></br>
    </div>
  );
};

export default Country;
