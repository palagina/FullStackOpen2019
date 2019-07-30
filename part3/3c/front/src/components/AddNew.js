import React from "react";

const AddNew = ({ handleData, newName, handleNameChange, newNumber, handleNumberChange }) => {

  return (
    <div>
     <h3>Add a new phone</h3>
     <form onSubmit={handleData}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddNew