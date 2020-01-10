import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
    born
    bookCount
  }
  published
  genres
}
`
const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

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

  const FILTERED_BOOKS = gql`
    query allBooks($genre: [String!]) {
      allBooks(genre: $genre) {
        title
        author {
          name
          born
          bookCount
        }
        published
        genres
      }
    }
  `;
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
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [recommendedGenre, setRecommendedGenre] = useState('')
  
  const [recommendedBooks, setRecommendedBooks] = useState(null)
  const [genres, setGenres] = useState([])

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS, {
    fetchPolicy: 'no-cache'
  })
  const books = useQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })

    const userInfo = useQuery(USER_INFO, {
      pollInterval: 1000
    })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)  
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.books, addedBook)) {
      dataInStore.books.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }   
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
      updateCacheWith(response.data.addBook)
    },
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const [editYear] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [login] = useMutation(LOGIN, {
     onError: handleError
  });

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

//book filter
useEffect(() => {
  if (selectedGenre === "") {
    setFilteredBooks(books);
  } else {
    
    const bookFilter = async (genre, client) => {
      const result = await client.query({
        query: FILTERED_BOOKS,
        variables: { genre },
      });
      setFilteredBooks(result);
    };
    bookFilter(selectedGenre, client);
  }
}, [token, selectedGenre, client, books, page]);

//book recommendations
  useEffect(() => {
  if (recommendedGenre === '') {
    setRecommendedBooks(books)
  }
  else {
    const bookFilter = async (genre, client) => {
      const result = await client.query({
        query: FILTERED_BOOKS,
        variables: { genre },
      })
      setRecommendedBooks(result)
    }
    bookFilter(recommendedGenre, client)
  }
}, [token, recommendedGenre, client, books, page]);

//user recommended genre
useEffect(() => {
  if (userInfo && userInfo.data && userInfo.data.me) {
    if (userInfo.data.me.favoriteGenre !== '') {
     setRecommendedGenre(userInfo.data.me.favoriteGenre)
    }
  }
}, [userInfo])

//reduce all the genres to array of objects
useEffect(() => {
  if (books && books.data && books.data.allBooks) {
    const booksForGenres = books.data.allBooks;
    const genreStrings = [
      ...new Set(booksForGenres.map(book => book.genres).reduce((a, b) => a.concat(b)))
    ];
    const genres = genreStrings.map((str, index) => ({ value: str }));
    setGenres(genres);
  }
}, [books]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookTitle = subscriptionData.data.bookAdded.title;
      setErrorMessage(`${bookTitle} added`);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    }
  });

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
        <button onClick={() => setPage("recommendation")}>
          recommendations
        </button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Authors
        show={page === "authors"}
        authors={authors}
        editYear={editYear}
      />
      <Books
        show={page === "books"}
        selectedGenre={selectedGenre}
        filteredBooks={filteredBooks}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />
      <Books
        show={page === "recommendation"}
        favoriteGenre={recommendedGenre}
        recommendedBooks={recommendedBooks}
        genres={genres}
        userInfo={userInfo}
      />
      <NewBook addBook={addBook} show={page === "add"} />
    </div>
  );
}

export default App