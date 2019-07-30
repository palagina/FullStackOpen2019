import React from 'react'

const Person = ({person, deleteName}) => {
  return (
    <li>
    {person.name} {person.number} 
    <button name={person.name} value={person.id} onClick={deleteName}>del</button>
    </li>
  )
}

export default Person