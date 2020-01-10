const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = "password";

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0-wafva.mongodb.net/graphql?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }  

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: [String!]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({});
        return mapBooks(books);
      } else if (args.author && args.genre) {
        const authorId = await (() => {
          Author.findOne({ name: name });
          return authorByName === null ? null : authorByName._id;
        });
        const books = await Book.find({
          author: { $in: [authorId] },
          genres: { $in: args.genre }
        });
        return mapBooks(books);
      } else if (args.author) {
        const authorId = await (() => {
          Author.findOne({ name: name });
          return authorByName === null ? null : authorByName._id;
        });
        const books = await Book.find({
          author: { $in: [authorId] }
        });
        return mapBooks(books);
      } else if (args.genre) {
        const books = await Book.find({
          genres: { $in: args.genre }
        });
        return mapBooks(books);
      }
    },
    allAuthors: (root, args) => {
      return Author.find({}).populate("books");
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let newAuthor = null;
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      if (!Author.findOne({ name: args.author })) {
        newAuthor = new Author({ name: args.author });
        await newAuthor.save();
      }
      const book = new Book({ ...args, author: newAuthor });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = await context.currentUser
      console.log(context.currentUser);
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "password") {
        throw new UserInputError("Incorrect credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

const mapBooks = (books) => {
  return books.map(book => {
    const { title, published, genres, author } = book
    return {
      title, published, genres,
      author: Author.findById(author)
    }
  })
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
