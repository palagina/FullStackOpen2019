import React, { useState } from 'react'
import Select from 'react-select'

const YearForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    if (props.authors.loading) {
      return <div>loading...</div>;
    }
    const authors = props.authors

    let options = []
    options = authors.map((author) => {
      return { value: author.name, label: author.name }
    })
    const select = async (selectedOption) => {
      setSelectedOption( selectedOption )
      setName(selectedOption.value)
    }

    const submit = async (e) => {
      e.preventDefault()
      await props.editYear({
        variables: { name, born }
      })
      setSelectedOption('')
      setName('')
      setBorn('')
    }

    return (
      <div>
        <form onSubmit={submit}>
          <div>
            <Select
              value={selectedOption}
              onChange={select}
              options={options}
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