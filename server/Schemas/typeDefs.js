// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: bookCount
  }

  type Book {
    authors: [String]
    description: String
    bookId: String      
    image: String
    link: String
    title: String    
  }

  type Auth {
    token: ID!
    user: User
  }
  
`;



// export the typeDefs
module.exports = typeDefs;