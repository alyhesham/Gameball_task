const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");



//get all tweets

router.get("/:userID", async (req, res) => {
  try {
    const tweets = await Tweet.find({ username: req.params.userID });
    res.json(tweets);
  } catch (err) {
    res.json({ message: err });
  }
});

// post a new tweet

router.post("/", async (req, res) => {
  const tweet = await new Tweet({
    username: req.body.username,
    content: req.body.content,
  });

  try {
    const savedTweet = await tweet.save();
    res.json(savedTweet);
  } catch (err) {
    res.json({ message: err });
  }
});


//post a new comment

//should fetch tweet id when selected and add its id to the parent_tweet value in DB

router.post("/comment", async (req, res) => {
  const tweet = await new Tweet({
    username: req.body.username,
    content: req.body.content,
    comment_flag : true,
    parent_tweet : req.body.parent_tweet
  });

  try {
    const savedTweet = await tweet.save();
    res.json(savedTweet);
  } catch (err) {
    res.json({ message: err });
  }
});

//get tweet or comment with id

router.get("/:tweetID", async (req, res) => {
  try {
    const removedTweet = await Tweet.findById(req.params.tweetID);
    res.json(removedTweet);
  } catch (err) {
    res.json({ message: err });
  }
});


//update tweet

router.patch("/update/:tweetID", async (req, res) => {
  try {
    const updatedTweet = await Tweet.updateOne(
      { _id: req.params.tweetID },
      {
        $set: { content: req.body.content },
      }
    );
    res.json(updatedTweet);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
