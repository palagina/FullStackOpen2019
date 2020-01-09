import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';  
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import YearForm from './components/YearForm'
import LoginForm from './components/LoginForm'

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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER_INFO = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const App = () => {

  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS, {
    fetchPolicy: 'no-cache'
  })
  const books = useQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  //  const userInfo = useQuery(USER_INFO, {
  //    pollInterval: 1000
  //  })
  const userInfo = {
    username: "user",
    favoriteGenre: "design"
  }

   const logout = () => {
     setToken(null)
     localStorage.clear()
     client.resetStore()
   }

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      dataInStore.books.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })

  const [editYear] = useMutation(EDIT_YEAR)
  // const [login] = useMutation(LOGIN, {
  //   onError: handleError
  // })

  const login = () => {
    setToken("newToken")
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

   if (!token) {
     return (
       <div>
         {errorNotification()}
         <h2>Login</h2>
         <LoginForm
           login={login}
           setToken={(token) => setToken(token)}
         />
       </div>
     )
   }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommendation")}>recommendations</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Authors result={authors} show={page === "authors"}/>
      <Books  show={page === "books"} result={books} />
      <Books show={page === 'recommendation'} result={books} userInfo={userInfo}/>
      <NewBook addBook={addBook} show={page === "add"} />

    </div>
  );
}

export default App