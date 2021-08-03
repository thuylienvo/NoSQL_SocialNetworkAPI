const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId(),
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

    }
);

// thought Schema
const ThoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true
      },
      reactions: [ReactionSchema],
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


 ThougthsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
  const Thoughts = model('Thoughts', ThoughtsSchema);
  
  module.exports = Thoughts;