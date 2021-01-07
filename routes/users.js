//jshint esversion:6
require("dotenv").config( );
const express = require("express");
const bcrypt = require("bcryptjs");
const Reservation = require("../models/Reservation");
const passport = require("passport");
const nodemailer = require("nodemailer");
const {
  ensureAuthenticated
} = require("../config/auth");

//User model
const User = require("../models/User");

const router = express.Router();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "semeevel@gmail.com",
    pass: "bakalauras123456"
  }
});

//Login Page
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", ensureAuthenticated, (req, res) => res.render("register"));

//Password change Page
router.get("/changepsw", ensureAuthenticated, (req, res) => res.render("change"));

//Rservation Page
router.get("/reservation", ensureAuthenticated, function(req, res) {
  res.render("reservation");
});

//Update reservation Page
router.get("/update/:id", ensureAuthenticated, function(req, res) {

  const receivedid = req.params.id;
  Reservation.findById(receivedid, function(err, reservation) {
    if (err) {
      console.log(err);
    } else {
      res.render("updateReservation", {
        fitpoint8: reservation.fitpoint8,
        fitpoint6: reservation.fitpoint6,
        fitpoint4: reservation.fitpoint4,
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        city: reservation.city,
        state: reservation.state,
        id: reservation._id
      });
    }
  });
});

//Register Handle
router.post("/register", (req, res) => {
  const {
    email,
    password,
    password1
  } = req.body;
  let errors = [];
  //Check required fields
  if (!email || !password || !password1) {
    errors.push({
      msg: "Užpildykite visus laukus!"
    });
  }
  // check pass lenght
  else if (password.length < 6) {
    errors.push({
      msg: "Slaptažodis turi buti ilgesnis nei 6 simboliai!"
    });
  } else if (password != password1) {
    errors.push({
      msg: "Nesutampa slaptažodžiai!"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      password
    });
  } else {
    // Validation passed
    User.findOne({
        email: email
      })
      .then(user => {
        if (user) {
          //User exists
          errors.push({
            msg: "Su tokiu el. pašto adresu jau yra registruotas darbuotojas!"
          });
          res.render("register", {
            errors,
            email,
            password
          });
        } else {
          const newUser = new User({
            email,
            password
          });

          //Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Set password to hashed
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash("success_msg", "Registracija sėkminga!");
                  res.redirect("/dashboard");
                })
                .catch(err => console.log(err));
            }));
        }
      });
  }
});

//Login
router.post('/login', (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let errors = [];
  //Check required fields
  if (!email || !password) {
    errors.push({
      msg: "Užpildykite visus laukus!"
    });
  }else if (!email.match(emailRegex)) {
    errors.push({
      msg: "Neteisingas el. pašto formatas!"
    });
  }
  if (errors.length > 0) {
    res.render("login", {
      errors,
      email,
      password
    });
  } else {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: "Neteisingi prisijungimo duomenys!"
  })(req, res, next);
}
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Sėkmingai atsijungėte");
  res.redirect("/users/login");
});

//Password change
router.post("/changepsw", (req, res, next) => {
  let errors = [];
  const {
    changepassword1,
    changepassword
  } = req.body;
  if (!changepassword || !changepassword1) {
    errors.push({
      msg: "Užpildykite visus laukus!"
    });
  } else if (changepassword != changepassword1) {
    errors.push({
      msg: "Nesutampa slaptažodžiai!"
    });
  }
  // check pass lenght
  else if (changepassword.length < 6) {
    errors.push({
      msg: "Slaptažodis turi buti ilgesnis nei 6 simboliai!"
    });
  }
  if (errors.length > 0) {
    res.render("change", {
      errors,
      changepassword1,
      changepassword
    });
  } else {
    var hasshed;
    //Hash password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(changepassword, salt, (err, hash) => {
        if (err) throw err;
        //Set password to hashed
        hasshed = hash;
        passport.authenticate('local', function(err, user, info) {

          User.findOneAndUpdate({
            email: req.user.email
          }, {
            password: hasshed
          }, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          });
        })(req, res);
      }));
    res.redirect("/dashboard");
  }
});

//Delete Reservation
router.get("/delete/:id", function(req, res) {
  const receivedid = req.params.id;
  Reservation.deleteOne({
    _id: receivedid
  }, function(err, res) {
    if (err) {
      console.log("Rezervacijos įrašas neištrintas");
    } else {
      console.log("Rezervacijos įrašas ištrintas");
    }
  });
  res.redirect("/dashboard");
});

// Update Reservation
router.post("/update/:id", function(req, res) {
  const receivedid = req.params.id;
  const {
    fitpoint8,
    fitpoint6,
    fitpoint4,
    fname,
    email,
    phone,
    city,
    state
  } = req.body;
  Reservation.findOneAndUpdate({
    _id: receivedid
  }, {
    fitpoint8: fitpoint8,
    fitpoint6: fitpoint6,
    fitpoint4: fitpoint4,
    name: fname,
    email: email,
    phone: phone,
    city: city,
    state: state
  }, {
    new: true
  }, (err, reservation) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    console.log(reservation);
  });
  let mailOption = {
    to: email,
    subject: "Treniruoklio užsakymas",
    html: "<h4>Sveiki, " + fname + "!</h4> <br> <p>Jūsų treniruoklių: <br> <br> FITPOINT 8: " + fitpoint8 + " vnt.<br> FITPOINT 6: " + fitpoint6 + " vnt.<br> FITPOINT 4: " + fitpoint4 + " vnt.<br><br> Užsakymo būsena yra atnaujinta.</p>"  + " <br><p>Užsakymo būsena: " + state + ".</p><p>Pagarbiai, <br> UAB Sigmas komanda</p>"
  };
  transporter.sendMail(mailOption, function(err, data){
  if(err){
    console.log(err);
  }else{
    console.log("Email sent");
  }});
  res.redirect("/dashboard");});

//Save new reservation
router.post("/reservation", (req, res) => {
  const state = "Gauta";
  let errors = [];
  let {
    Mega6000Pro,
    Mega3000Pro,
    Mega2000,
    fname,
    email,
    phone,
    cities
  } = req.body;
  const phoneRegex = /^[+][3][7][0]\d{8}$/;
  const number = phone.toString();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (Mega6000Pro == 0 && Mega3000Pro == 0 && Mega2000 == 0) {
    errors.push({
      msg: "Jūs nepasirinkote treniruoklio modelio, kurį norite rezervuoti!"
    });
  } else if (!fname) {
    errors.push({
      msg: "Įveskite vardą!"
    });
  } else if (!email) {
    errors.push({
      msg: "Įveskite el. paštą!"
    });
  } else if (!phone) {
    errors.push({
      msg: "Įveskite telefono numerį!"
    });
  } else if (!number.match(phoneRegex)) {
    errors.push({
      msg: "Neteisingas telefono numerio formatas!"
    });
  } else if (!email.match(emailRegex)) {
    errors.push({
      msg: "Neteisingas el. pašto formatas!"
    });
  }
  if (errors.length > 0) {
    res.render("reservation", {
      errors,
      Mega6000Pro,
      Mega3000Pro,
      Mega2000,
      fname,
      email,
      phone,
      cities
    });
  } else {
    const d = new Date();
    const month = d.getMonth() + 1 ;
    const fullDate = (d.getFullYear() + "-" + month + "-" + d.getDate());
    if (Mega6000Pro === "") {
      Mega6000Pro = 0;
    }
    if (Mega3000Pro === "") {
      Mega3000Pro = 0;
    }
    if (Mega2000 === "") {
      Mega2000 = 0;
    }
    let newReservation = new Reservation({
      fitpoint8: Mega6000Pro,
      fitpoint6: Mega3000Pro,
      fitpoint4: Mega2000,
      name: fname,
      email: email,
      phone: phone,
      city: cities,
      date: fullDate,
      state: state
    });
    console.log("Rezervacija issaugota");
    newReservation.save();
    let mailOption = {
      to: email,
      subject: "Treniruoklio užsakymas",
      html: "<h4>Sveiki, " + fname + "!</h4> <br><p>Jūsų treniruoklių: <br> FITPOINT 8: " + Mega6000Pro + " vnt. <br> FITPOINT 6: " + Mega3000Pro + " vnt.<br> FITPOINT 4: " + Mega2000 + " vnt.<br> užsakymas gautas.</p>"  + " <p>Dėl užsakymo su Jumis susieks atsakingas asmuo per 2d.d.. </p><p>Pagarbiai, <br> UAB Sigmas komanda</p>"
    };
    transporter.sendMail(mailOption, function(err, data){
    if(err){
      console.log(err);
    }else{
      console.log("Email sent");
    }});
    res.redirect("/dashboard");
  }
});

module.exports = router;
