import React from "react";
import Person from "./Person";

const PhoneList = ({ searchFilter }) => {
  const phoneList = () =>
    searchFilter().map(person => (
      <Person key={person.name} name={person.name} number={person.number} />
    ));

  return (
    <div>
      <h2>Numbers</h2>
      <ol>{phoneList()}</ol>
    </div>
  );
};

export default PhoneList;
