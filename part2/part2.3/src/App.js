import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import AddNew from "./components/AddNew";
import PhoneList from "./components/PhoneList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons").then(response => {
        setPersons(response.data);
    });
  }, []);

  const searchFilter = () =>
    persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleNameChange = event => {
    setNewName(event.target.value);
    console.log(event.target);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const checkExisting = newName => {
    let nameExists = false;
    persons.forEach(person =>
      person.name === newName ? (nameExists = true) : (nameExists = false)
    );
    return nameExists;
  };

  const addName = event => {
    event.preventDefault();
    if (checkExisting(newName) === false) {
      const nameObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearch={handleSearch} />
      <AddNew
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <PhoneList searchFilter={searchFilter} />
    </div>
  );
};

export default App;
