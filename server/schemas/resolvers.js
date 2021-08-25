const { User, Thought } = require('../models');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

//object called resolvers with a Query nested object that holds a series of methods. These methods get the same name of the query or mutation they are resolvers for
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');
    
            return userData;
          }
    
          throw new AuthenticationError('Not logged in');
        },
    
    user: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    //we pass in the parent as more of a placeholder parameter
    // the ternary operator checks if a username exists, if it doesnt then parent is used as an empty objext
    user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts');
      },
      thoughts: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Thought.find(params).sort({ createdAt: -1 });
      },
      thought: async (parent, { _id }) => {
        return Thought.findOne({ _id });
      }
    },
  
    Mutation: {
    //the Mongoose User model creates a new user in the database with whatever is passed in as the args
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },

      //Only logged-in users should be able to use this mutation, hence why we check for the existence of context.user first. Remember, the decoded JWT is only added to context if the verification passes. The token includes the user's username, email, and _id properties, which become properties of context.user and can be used in the follow-up Thought.create() and User.findByIdAndUpdate() methods.
      addThought: async (parent, args, context) => {
        if (context.user) {
          const thought = await Thought.create({ ...args, username: context.user.username });
  
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
  
          return thought;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },

      //reactions are stored as arrays in thoughts, so we need to update a thought to add a reaction
      addReaction: async (parent, { thoughtId, reactionBody }, context) => {
        if (context.user) {
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: { reactionBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
  
          return updatedThought;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      }
    }
  };

module.exports = resolvers;
