import React from "react";
import Country from "./Country";

const Button = ({ country }) => {

    const showInfo = () => {
        const toggleInfo = document.getElementById(country.name);
        if (toggleInfo.style.display === "none") {
            toggleInfo.style.display = "block";
          } else {
            toggleInfo.style.display = "none";
          }
      }; 

  return (
    <div>
      <b>{country.name.toUpperCase()}</b>
      <button onClick={showInfo}>show</button>
      <div id={country.name} style={{display:"none"}} >
          <Country country={country} /> 
      </div> 
    </div>
  );
};

export default Button;
