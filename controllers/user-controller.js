const { User, Thoughts } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // add a friend 
  addFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId }},
          { new: true }
      )
      .then((results) => {
          if (!results) {
              res.status(400).json({ message: "No friend found."});
              return;
          }
          res.json(results);
      })
      .catch((err) => res.status(400).json(err));
  },
  // remove a friend
  removeFriend({ params}, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId }},
        { new: true }
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }

}; 

module.exports = userController;
