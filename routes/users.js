const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt')



//get all ausers

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//add user

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ username: req.body.username, password: hashedPassword });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch(err) {
    res.json({ message: err });
  }
})


//login


router.post('/login', async (req, res) => {
  const user = await User.findOne({username : req.body.username})
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      var myvar = req.body.username
      
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

module.exports = router;
