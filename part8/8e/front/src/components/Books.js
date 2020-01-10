import React, { useState } from 'react'
import Select from 'react-select'

const Books = props => {
  if (!props.show) {
    return null
  }

  const {genres, userInfo} = props

  if (!userInfo) {
    const {selectedGenre, setSelectedGenre} = props
    const filteredBooks = props.filteredBooks.data.allBooks;
    let newFilteredBooks =
      selectedGenre !== ""
        ? filteredBooks.filter(book =>
            book.genres.find(genre => genre === selectedGenre.value)
          )
        : filteredBooks;

    const options = genres.map(genre => {
      return { value: genre.value, label: genre.value };
    });

    const select = async selectedGenre => {
      setSelectedGenre(selectedGenre);
    };
    return (
      <div>
        <h2>books</h2>
        <div style={{ width: "200px" }}>
          <Select
            value={selectedGenre}
            onChange={select}
            options={options}
            placeholder="Filter by genre"
          />
        </div>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {newFilteredBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {     
    const recommendedBooks = props.recommendedBooks.data.allBooks;
    const favoriteGenre = props.favoriteGenre
    console.log(favoriteGenre);
    let recommendations = (recommendedBooks.filter(book =>
     book.genres.find(genre => genre === favoriteGenre.value)))

    return (
      <div>
        <h2>recommendations</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendations.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}; 

export default Books