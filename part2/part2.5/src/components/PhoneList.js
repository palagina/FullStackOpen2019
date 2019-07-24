import React from "react";
import Person from "./Person";

const PhoneList = ({ searchFilter, deleteName }) => {
  const phoneList = () =>
    searchFilter().map((person, id) => (
      <Person key={id} id={id} person={person} deleteName={deleteName} />
    ));

  return (
    <div>
      <h2>Numbers</h2>
      <ol>{phoneList()}</ol>
    </div>
  );
};

export default PhoneList;
