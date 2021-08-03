const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


// User Model
const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]
      },
      thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    // Friends Id Array 
      friends: [
          {
              type: Schema.Types.ObjectId,
              ref:'User'
          }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  
  // virtual called friendCount that retrieves the length of the user's friends array field on query
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = model('User', UserSchema);
  
  module.exports = User;
  