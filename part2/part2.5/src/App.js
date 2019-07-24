import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNew from "./components/AddNew";
import PhoneList from "./components/PhoneList";
import nameService from "./services/names";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    nameService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const searchFilter = () =>
    persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  //Check if the name already exists in the phonelist
  const checkExisting = newName => {
    let personMatch = undefined;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        personMatch = persons[i];
      }
    }
    return personMatch;
  };

  //Add a new name
  const addName = (nameObject) => {
    setPersons(persons.concat(nameObject));
    nameService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName));
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Update existing person
  const updateName = (personMatch, nameObject) => {
    if (window.confirm(`${nameObject.newName} is already added to phonebook. Do you want to replace it?`)) {
      nameService
      .update(personMatch.id, nameObject)
      .then(() => {
        nameService.getAll().then(updatedPersons => {
          setPersons(updatedPersons);
        })  
        .catch(error => {
          console.log(error);
        });
      })
    } else {
      setNewName("");
      setNewNumber("");
    }
  }

  //Handle add or update functionality
  const handleData = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    const personMatch = checkExisting(newName)
    personMatch === undefined ? addName(nameObject) : updateName(personMatch, nameObject)
  };

  //Delete person
  const deleteName = event => {
    event.preventDefault();
    if (window.confirm(`Do you want to delete ${event.target.name}`)) {
      nameService
        .remove(event.target.value)
        .then(() => {
          nameService.getAll().then(updatedPersons => {
            setPersons(updatedPersons);
          })
        })
        .catch(error => {
          console.log("Person does not exist");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearch={handleSearch} />
      <AddNew
        handleData={handleData}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <PhoneList searchFilter={searchFilter} deleteName={deleteName} />
    </div>
  );
};

export default App;
