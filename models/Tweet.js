const mongoose = require("mongoose");

//schema for tweets and comments

const tweetSchema = mongoose.Schema({
  username: String,
  content: {
    type: String,
    minLength: 1,
    maxLength: 140,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment_flag: {
    type: Boolean,
    default: false,
  },
  parent_tweet: String
});

module.exports = mongoose.model("tweets", tweetSchema);

