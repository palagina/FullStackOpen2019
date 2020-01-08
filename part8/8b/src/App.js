import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import YearForm from './components/YearForm'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
      genres
    }
  }`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
const EDIT_YEAR = gql`
  mutation editYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <ApolloConsumer>
        {client => (
          <Query query={ALL_AUTHORS}>
            {result => <Authors result={result} show={page === "authors"} />}
          </Query>
        )}
      </ApolloConsumer>

      <Query query={ALL_BOOKS}>
        {result => <Books result={result} show={page === "books"} />}
      </Query>

      <Mutation
        mutation={CREATE_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }]}
        onError={handleError}
      >
        {addBook => <NewBook addBook={addBook} show={page === "add"} />}
      </Mutation>

      <h2>Set birth year</h2>
      <Mutation
        mutation={EDIT_YEAR}
        refetchQueries={[{ query: ALL_BOOKS }]}
        onError={handleError}
      >
        {editYear => <YearForm editYear={editYear} />}
      </Mutation>
    </div>
  );
}

export default App