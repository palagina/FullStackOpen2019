import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
  })

  const query = gql`
    {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

  ReactDOM.render(
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>, 
    document.getElementById('root')
  )