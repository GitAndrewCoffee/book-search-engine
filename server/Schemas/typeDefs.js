// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    authors: [String]
    bookId: String
    description: String       
    image: String    
    title: String    
  }

  input InputBook {
    authors: [String]
    bookId: String
    description: String       
    image: String    
    title: String       
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(newBook: InputBook!): User
    removeBook(bookId: String!): User
  }  
`;

// export the typeDefs
module.exports = typeDefs;