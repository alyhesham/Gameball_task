const express = require("express");
var flash = require('connect-flash');
const req = require("express/lib/request");
const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());
app.use(flash());

//import routes

const tweetRoutes = require("./routes/tweets");

const userRoutes = require("./routes/users");




//middlewares
app.use("/tweets", tweetRoutes);

app.use("/users", userRoutes);

//routing

app.get("/",  (req, res) => {
    res.send('Homepage');
});

// connect DB

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to db")
);

app.listen(8020);
