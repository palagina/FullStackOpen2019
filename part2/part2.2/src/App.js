import React, { useState } from "react";
import Search from "./components/Search";
import AddNew from "./components/AddNew";
import PhoneList from "./components/PhoneList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const searchFilter = () =>
    persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );

/*   const phoneList = () =>
    searchFilter().map(person => (
      <Person key={person.name} name={person.name} number={person.number} />
    )); */

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
