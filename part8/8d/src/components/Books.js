import React, { useState } from 'react'
import Select from 'react-select'

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState("");
  //const [recommendations, setRecommendations] = useState({});

  if (!props.show) {
    return null;
  }
  if (props.result.loading) {
    return <div>loading...</div>;
  }

  const books = props.result.data.allBooks;
  const genreStrings = [
    ...new Set(books.map(book => book.genres).reduce((a, b) => a.concat(b)))
  ];
  const genres = genreStrings.map((str, index) => ({ value: str }));

  const options = genres.map(genre => {
    return { value: genre.value, label: genre.value };
  });

  let filteredBooks =
    selectedGenre !== ""
      ? books.filter(book =>
          book.genres.find(genre => genre === selectedGenre.value)
        )
      : books;



  const select = async selectedGenre => {
    setSelectedGenre(selectedGenre);
  };

  if (!props.userInfo) {
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
            {filteredBooks.map(a => (
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
          
   let recommendations = (books.filter(book =>
    book.genres.find(genre => genre === props.userInfo.favoriteGenre)
  ))
  
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