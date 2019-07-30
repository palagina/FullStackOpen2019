import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import AddNew from "./components/AddNew";
import PhoneList from "./components/PhoneList";
import nameService from "./services/names";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState([])

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

  //Checks and returns already existing person or undefined
  const checkExisting = newName => {
    const personMatch = persons.find(person => person.name === newName)
    return personMatch;
  };

  //Add a new name
  const addName = (nameObject) => {
    setPersons(persons.concat(nameObject));
    nameService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName));
        setMessage(["success", `'${nameObject.name}' was added`]);
        setTimeout(() => {
          setMessage([])
        }, 5000) 
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        setMessage(["error", "Something went wrong"])
        setTimeout(() => {
          setMessage([])
        }, 5000)
      });
  }

  //Update existing person
  const updateName = (personMatch, nameObject) => {
    if (window.confirm(`${personMatch.name} is already added to phonebook. Do you want to replace it?`)) {
      nameService
      .update(personMatch.id, nameObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => (person.id!==personMatch.id) ? person : updatedPerson))
        setMessage(["success", `'${personMatch.name}' was updated`])
        setTimeout(() => {
          setMessage([])
        }, 5000) 
      })
      .catch(error => {
        setMessage(["error", `'${personMatch.name}' was already removed from server`])
        setTimeout(() => {
          setMessage([])
        }, 5000)
        setPersons(persons.filter(person => person.id !== personMatch.id))
      })
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
    setNewName("");
    setNewNumber("");
  };

  //Delete person
  const deleteName = event => {
    event.preventDefault();
    const deletedName = event.target.name;
    console.log(event.target.value);
    if (window.confirm(`Do you want to delete ${deletedName}`)) {
      nameService
        .remove(event.target.value)
        .then(() =>{
          setPersons(persons.filter(person => person.name !== deletedName));
          setMessage(["success", `'${deletedName}' was deleted`])
          setTimeout(() => {
            setMessage([])
          }, 5000) 
        })
        .catch(error => {
          console.log(error)
          setMessage(["error", `Note '${deletedName}' was already deleted`])
          setTimeout(() => {
            setMessage([])
          }, 5000) 
           setPersons(persons.filter(person => person.name !== deletedName))
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
