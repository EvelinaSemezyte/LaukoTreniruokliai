//jshint esversion:6

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  fitpoint8:{
    type: Number,
    required: true
  },
  fitpoint6:{
    type: Number,
    required: true
  },
  fitpoint4:{
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
