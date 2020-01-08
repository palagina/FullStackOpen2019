import React, { useState } from 'react'

const YearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
  
    const submit = async (e) => {
      e.preventDefault()
  
      await props.editYear({
        variables: { name, born }
      })
  
      setName('')
      setBorn('')
    }


    return (
      <div>
        <form onSubmit={submit}>
          <div>
            <select>
              <option>{props.refetchQueries}</option>
            </select>
          </div>

          <div>
            name{" "}
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            year{" "}
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type="submit">change number</button>
        </form>
      </div>
    );
  }

  export default YearForm