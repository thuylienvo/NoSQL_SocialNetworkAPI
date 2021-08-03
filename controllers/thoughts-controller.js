const { Thoughts, User } = require('../models');

const thoughtsController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtbyId({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then(dbThoughtsData => {
          if(!dbThoughtsData) {
            res.status(400).json({message: 'Oh my...no thought found'});
            return;
         }
      res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add a thought
  addThought({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
          return User.findOneAndUpdate(
              { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
      })
      .then((dbThoughtsData) => {
          if (!dbThoughtsData) {
              res.status(400).json({ message: 'No thought found with this id.'});
              return;
          }
          res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // update user by id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({ message: 'Think again! Unable to delete this thought.'});
            return;
          }
          res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

  // add a reaction 
  addReaction({ params }, res) {
      Thoughts.findOneAndUpdate(
          { _id: params.userId },
          { $push: { reactions: params.reactionId }},
          { new: true }
      )
      .then((results) => {
          if (!results) {
              res.status(400).json({ message: "No reaction found."});
              return;
          }
          res.json(results);
      })
      .catch((err) => res.status(400).json(err));
  },
  // remove a reaction
  deleteReaction({ params}, res) {
      Thoughts.findOneAndUpdate(
        { _id: params.userId },
        { $push: { reactions: params.reactionId }},
        { new: true }
      )
      .then(dbReactionsData => res.json(dbReactionsData))
      .catch(err => res.json(err));
  }

}; 


module.exports = thoughtsController;