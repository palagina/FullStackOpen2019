import React from "react";
import Person from "./Person";

const PhoneList = ({ searchFilter, deleteName }) => {
  const phoneList = () =>
    searchFilter().map((person, id) => (
      <Person key={id} person={person} deleteName={deleteName} />
    ));

  return (
    <div>
      <h2>Numbers</h2>
      <ol style={phoneListStyle}>{phoneList()}</ol>
    </div>
  );
};

const phoneListStyle = {
    color: "grey",
    paddingTop: "5px",
    fontSize: "15px",
}

export default PhoneList;
