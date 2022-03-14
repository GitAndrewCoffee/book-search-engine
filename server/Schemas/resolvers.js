const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        console.log('me running');
        console.log(context.user._id);
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
          console.log('returning user');
          console.log(userData);
          return userData;
        }
        console.log('not logged in');
        throw new AuthenticationError('Not logged in');

      },
  },
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('login running')
      
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log('bad password');
        throw new AuthenticationError('Incorrect credentials');        
      }

      const token = signToken(user);
      console.log('login successful')
      console.log(token);
      return { token, user };
    },
    saveBook: async (parent, { newBook }, context) => {
     
      console.log('saveBook is running"');
      console.log(context);
      console.log(newBook);

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          { $push: { savedBooks: newBook }},
          {new: true}
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;