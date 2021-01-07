//jshint esversion:6

require("dotenv").config();
const express = require("express");
const Reservation = require("../models/Reservation");
const bodyParser = require("body-parser");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/rezervacija", (req, res) => {
  res.render("rezervacija");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
// Reservation Handel
router.post("/rezervacija", (req, res) => {
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
      msg: "Jūs nepasirinkote treniruoklio modelio, kurį norite rezervuoti"
    });
  } else if (!fname) {
    errors.push({
      msg: "Įveskite vardą"
    });
  } else if (!email) {
    errors.push({
      msg: "Įveskite el. paštą"
    });
  } else if (!phone) {
    errors.push({
      msg: "Įveskite telefono numerį"
    });
  } else if (!number.match(phoneRegex)) {
    errors.push({
      msg: "Neteisingas numerio formatas"
    });
  } else if (!email.match(emailRegex)) {
    errors.push({
      msg: "Neteisingas el. pašto formatas"
    });
  }
  if (errors.length > 0) {
    res.render("rezervacija", {
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
    const month = d.getMonth() + 1;
    const fullDate = (d.getFullYear() + "-" + month + "-" + d.getDate());
    console.log(fullDate);
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
      from: "semeevel@gmail.com",
      to: email,
      subject: "Treniruoklių užsakymas",
      html: "<h4>Sveiki, " + fname + "!</h4> <br> <p>Jūsų treniruoklių: <br> <br> FITPOINT 8: " + Mega6000Pro + " vnt. <br> FITPOINT 6: " + Mega3000Pro + " vnt. <br>FITPOINT 4: " + Mega2000 + " vnt. <br> užsakymas gautas.</p>" + " <p>Dėl užsakymo su Jumis susieks atsakingas asmuo per 2d.d.. </p><p>Pagarbiai, <br> UAB Sigmas komanda</p>"
    };
    transporter.sendMail(mailOption, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
    errors.push({
      msg: "Jūsų užsakymas gautas. Nurodytų el. pašto adresu išsiuntemė užsakymo informaciją."
    });
    res.render("rezervacija", {
      errors
    });
  }
});

module.exports = router;
