//jshint esversion:6

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//Passport Config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").MongoURI;

// public files (css, images, js script)
app.use(express.static("public"));

//EJS
app.set("view engine", "ejs");

// BodyParsers
app.use(bodyParser.urlencoded({
  extended: false
}));

//Express Session
app.use(session({
  secret: 'secret session',
  resave: true,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

//Connect flash
app.use(flash());


//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/", require("./routes/reservation"));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
