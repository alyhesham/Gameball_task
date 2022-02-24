const mongoose = require("mongoose");

//schema for user


const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
  });
  
module.exports = mongoose.model("users", userSchema);