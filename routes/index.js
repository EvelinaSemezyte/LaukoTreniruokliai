 //jshint esversion:6
 require("dotenv").config();
 const express = require("express");
 const nodemailer = require("nodemailer");
 const Reservation = require("../models/Reservation");
 const {
   ensureAuthenticated
 } = require("../config/auth");
 const router = express.Router();

 let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD
   }
 });
 router.get("/", function(req, res) {
   res.render("main");
 });

 router.get("/treniruokliai", function(req, res) {
   res.render("vidinis-treniruokliai");
 });

 router.get("/apiemus", function(req, res) {
   res.render("apie");
 });

 router.get("/rezervacija", function(req, res) {
   res.render("rezervacija");
 });

 router.get("/treniruokliai/:treniruoklisName", function(req, res) {
   const receivedTreniruoklisName = req.params.treniruoklisName;
   var treniruoklisName = "";
   var mobilepic1, mobilepic2, mobilepic3, apr, featuresText1, featuresText2, featuresText3, featuresText4, featuresText5, featuresText6, featuresText7, featuresText8, picture1, picture2, picture3, picture4, picture5, kaina;

   if (receivedTreniruoklisName === "FITPOINT8") {
     treniruoklisName = "FITPOINT 8";
     mobilepic1 = "/images/dazymas1.png";
     mobilepic2 = "/images/lankstymas.png";
     mobilepic3 = "/images/dazymas-tikras.png";
     featuresText2 = "FITPOINT treniruokliai atitinka aukščiausius kokybės ir saugumo reikalavimus, nes yra gaminami pasitelkiant pažangiausias technologijas. Detalės preciziškai išpjaunamos lazeriu ir formuojamos lenkimo staklėmis. Taip gaunama vientisa ir tvirta konstrukcija, be aštrių kampų ir be silpnų vietų.";
     featuresText1 = "FITPOINT treniruokliai suteikia labai platų atliekamų pratimų spektrą. Būtent dėl to jais gali naudotis visa šeima – įvairaus amžiaus bei fizinio pasirengimo žmonės. Geriausia tai, kad tokiam treniruokliui piko valandos negalioja – jis niekada nebus užimtas, nes bus ne klube, o jūsų šeimos kieme.";
     featuresText3 = "Mes norime, kad FITPOINT treniruokliai jums tarnautų ilgai ir patikimai. Todėl kiekvieną detalę padengiame antikoroziniu cinko sluoksniu ir papildomu, ilgaamžių miltelinių dažų sluoksniu. Galite būti tikri – šie treniruokliai beveik amžini ir atlaikys daugybę metų negailestingų oro sąlygų.";
     featurestext4 = "Atsispaudimai. Pagrindinės raumenų grupės: didysis krūtinės r., mažasis krūtinės r., priekinis deltinis r., trigalvis žąsto r., snapinis žąsto r.. Kitos raumenų grupės: trapecinis r., vidurinis deltinis r., dvigalvis žąsto r., tiesusis pilvo r., skersinis pilvo r., įstrižiniai pilvo r..";
     featuresText5 = "Štangos spaudimas ant suoliuko. Pagrindinės raumenų grupės: didysis krūtinės r., priekinis deltinis r., tricepso r.. Kitos raumenų grupės: mažasis krūtinės r., vidurinis deltinis r., dvigalvis žąsto r., žąstinis r.. ";
     featuresText6 = "Lygiagretės. Pagrindinės raumenų grupės: tricepso r., didysis krūtinės r., priekinis deltinis r.. Kitos raumenų grupės: trapecinis r., vidurinis ir galinis deltinis r., priekinis dantytasis r., žąsto r..";
     featuresText7 = "Prisitraukimai prie skersinio. Pagrindinės raumenų grupės: platusis nugaros r., rombinis r., trapecinis r., didysis apvalusis r., dvigalvis žąsto r., žąsto r., žąstinis stipinkaulio r.. Kitos raumenų grupės: galinis deltinis r., podyglinis r., pomentinis r., mažasis apvalusis r..";
     featuresText8 = "Pritūpimai su štangta. Pagrindinės raumenų grupės: keturgalvis šlaunies r., didysis sėdmens r., vidurinis sėdmens r., dvigalvis šlaunies r.. Kitos raumenų grupės: tiesusis nugaros r., tiesusis pilvo r., išorinis įstrižinis pilvo r., ilgasis pritraukiamasis r., tempiamasis plačiosios fascijos r., plačioji fascija, dvilypis blauzdos r..";
     paragraph = "FitPoint pagalba kiekvienas gali savarankiškai lavinti pagrindines raumenų grupes – kojų, pilvo, rankų, krūtinės, nugaros, pečių juostos ir juosmens. Štai keletas iš daugelio pratimų, kuriuos galite su jais atlikti";
     picture1 = "/images/Group (1).png";
     picture2 = "/images/Group.png";
     picture3 = "/images/Group (2).png";
     picture4 = "/images/Group (3).png";
     picture5 = "/images/Group (4).png";
     kaina = "799€";
   } else if (receivedTreniruoklisName === "FITPOINT6") {
     treniruoklisName = "FITPOINT 6";
     mobilepic1 = "/images/dazymas1.png";
     mobilepic2 = "/images/lankstymas.png";
     mobilepic3 = "/images/dazymas-tikras.png";
     featuresText2 = "FITPOINT treniruokliai atitinka aukščiausius kokybės ir saugumo reikalavimus, nes yra gaminami pasitelkiant pažangiausias technologijas. Detalės preciziškai išpjaunamos lazeriu ir formuojamos lenkimo staklėmis. Taip gaunama vientisa ir tvirta konstrukcija, be aštrių kampų ir be silpnų vietų.";
     featuresText1 = "FITPOINT treniruokliai suteikia labai platų atliekamų pratimų spektrą. Būtent dėl to jais gali naudotis visa šeima – įvairaus amžiaus bei fizinio pasirengimo žmonės. Geriausia tai, kad tokiam treniruokliui piko valandos negalioja – jis niekada nebus užimtas, nes bus ne klube, o jūsų šeimos kieme.";
     featuresText3 = "Mes norime, kad FITPOINT treniruokliai jums tarnautų ilgai ir patikimai. Todėl kiekvieną detalę padengiame antikoroziniu cinko sluoksniu ir papildomu, ilgaamžių miltelinių dažų sluoksniu. Galite būti tikri – šie treniruokliai beveik amžini ir atlaikys daugybę metų negailestingų oro sąlygų.";
     featurestext4 = "Atsispaudimai. Pagrindinės raumenų grupės: didysis krūtinės r., mažasis krūtinės r., priekinis deltinis r., trigalvis žąsto r., snapinis žąsto r.. Kitos raumenų grupės: trapecinis r., vidurinis deltinis r., dvigalvis žąsto r., tiesusis pilvo r., skersinis pilvo r., įstrižiniai pilvo r..";
     featuresText5 = "Štangos spaudimas ant suoliuko. Pagrindinės raumenų grupės: didysis krūtinės r., priekinis deltinis r., tricepso r.. Kitos raumenų grupės: mažasis krūtinės r., vidurinis deltinis r., dvigalvis žąsto r., žąstinis r.. ";
     featuresText6 = "Lygiagretės. Pagrindinės raumenų grupės: tricepso r., didysis krūtinės r., priekinis deltinis r.. Kitos raumenų grupės: trapecinis r., vidurinis ir galinis deltinis r., priekinis dantytasis r., žąsto r..";
     featuresText7 = "Prisitraukimai prie skersinio. Pagrindinės raumenų grupės: platusis nugaros r., rombinis r., trapecinis r., didysis apvalusis r., dvigalvis žąsto r., žąsto r., žąstinis stipinkaulio r.. Kitos raumenų grupės: galinis deltinis r., podyglinis r., pomentinis r., mažasis apvalusis r..";
     featuresText8 = "Pritūpimai su štangta. Pagrindinės raumenų grupės: keturgalvis šlaunies r., didysis sėdmens r., vidurinis sėdmens r., dvigalvis šlaunies r.. Kitos raumenų grupės: tiesusis nugaros r., tiesusis pilvo r., išorinis įstrižinis pilvo r., ilgasis pritraukiamasis r., tempiamasis plačiosios fascijos r., plačioji fascija, dvilypis blauzdos r..";
     paragraph = "FitPoint pagalba kiekvienas gali savarankiškai lavinti pagrindines raumenų grupes – kojų, pilvo, rankų, krūtinės, nugaros, pečių juostos ir juosmens. Štai keletas iš daugelio pratimų, kuriuos galite su jais atlikti";
     picture1 = "/images/Group (1).png";
     picture2 = "/images/Group.png";
     picture3 = "/images/Group (2).png";
     picture4 = "/images/Group (3).png";
     picture5 = "/images/Group (4).png";
     kaina = "699€";
   } else {
     treniruoklisName = "FITPOINT 4";
     mobilepic1 = "/images/dazymas1.png";
     mobilepic2 = "/images/lankstymas.png";
     mobilepic3 = "/images/dazymas-tikras.png";
     featuresText2 = "FITPOINT treniruokliai atitinka aukščiausius kokybės ir saugumo reikalavimus, nes yra gaminami pasitelkiant pažangiausias technologijas. Detalės preciziškai išpjaunamos lazeriu ir formuojamos lenkimo staklėmis. Taip gaunama vientisa ir tvirta konstrukcija, be aštrių kampų ir be silpnų vietų.";
     featuresText1 = "FITPOINT treniruokliai suteikia labai platų atliekamų pratimų spektrą. Būtent dėl to jais gali naudotis visa šeima – įvairaus amžiaus bei fizinio pasirengimo žmonės. Geriausia tai, kad tokiam treniruokliui piko valandos negalioja – jis niekada nebus užimtas, nes bus ne klube, o jūsų šeimos kieme.";
     featuresText3 = "Mes norime, kad FITPOINT treniruokliai jums tarnautų ilgai ir patikimai. Todėl kiekvieną detalę padengiame antikoroziniu cinko sluoksniu ir papildomu, ilgaamžių miltelinių dažų sluoksniu. Galite būti tikri – šie treniruokliai beveik amžini ir atlaikys daugybę metų negailestingų oro sąlygų.";
     featurestext4 = "Atsispaudimai. Pagrindinės raumenų grupės: didysis krūtinės r., mažasis krūtinės r., priekinis deltinis r., trigalvis žąsto r., snapinis žąsto r.. Kitos raumenų grupės: trapecinis r., vidurinis deltinis r., dvigalvis žąsto r., tiesusis pilvo r., skersinis pilvo r., įstrižiniai pilvo r..";
     featuresText5 = "Štangos spaudimas ant suoliuko. Pagrindinės raumenų grupės: didysis krūtinės r., priekinis deltinis r., tricepso r.. Kitos raumenų grupės: mažasis krūtinės r., vidurinis deltinis r., dvigalvis žąsto r., žąstinis r.. ";
     featuresText6 = "Lygiagretės. Pagrindinės raumenų grupės: tricepso r., didysis krūtinės r., priekinis deltinis r.. Kitos raumenų grupės: trapecinis r., vidurinis ir galinis deltinis r., priekinis dantytasis r., žąsto r..";
     featuresText7 = "Prisitraukimai prie skersinio. Pagrindinės raumenų grupės: platusis nugaros r., rombinis r., trapecinis r., didysis apvalusis r., dvigalvis žąsto r., žąsto r., žąstinis stipinkaulio r.. Kitos raumenų grupės: galinis deltinis r., podyglinis r., pomentinis r., mažasis apvalusis r..";
     featuresText8 = "Pritūpimai su štangta. Pagrindinės raumenų grupės: keturgalvis šlaunies r., didysis sėdmens r., vidurinis sėdmens r., dvigalvis šlaunies r.. Kitos raumenų grupės: tiesusis nugaros r., tiesusis pilvo r., išorinis įstrižinis pilvo r., ilgasis pritraukiamasis r., tempiamasis plačiosios fascijos r., plačioji fascija, dvilypis blauzdos r..";
     paragraph = "FitPoint pagalba kiekvienas gali savarankiškai lavinti pagrindines raumenų grupes – kojų, pilvo, rankų, krūtinės, nugaros, pečių juostos ir juosmens. Štai keletas iš daugelio pratimų, kuriuos galite su jais atlikti";
     picture1 = "/images/Group (1).png";
     picture2 = "/images/Group.png";
     picture3 = "/images/Group (2).png";
     picture4 = "/images/Group (3).png";
     picture5 = "/images/Group (4).png";
     kaina = "599€";
   }
   res.render("treniruoklis", {
     name: treniruoklisName,
     mob1: mobilepic1,
     mob2: mobilepic2,
     mob3: mobilepic3,
     featurestext1: featuresText1,
     featurestext2: featuresText2,
     featurestext3: featuresText3,
     pic1: picture1,
     pic2: picture2,
     pic3: picture3,
     pic4: picture4,
     pic5: picture5,
     featurestext4: featurestext4,
     featurestext5: featuresText5,
     featurestext6: featuresText6,
     featurestext7: featuresText7,
     featurestext8: featuresText8,
     paragraph: paragraph,
     kaina: kaina
   });
 });

 router.post("/apiemus", function(req, res) {
   let errors = [];
   const {
     email,
     subject,
     message
   } = req.body;
   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

   if (!email && !subject && !message) {
     errors.push({
       msg: "Užpildykite visus laukus!"
     });
   } else if (!email) {
     errors.push({
       msg: "Įveskite el. pašto adresą!"
     });
   } else if (!subject) {
     errors.push({
       msg: "Įveskite temą!"
     });
   } else if (!message) {
     errors.push({
       msg: "Įveskite žinutę!"
     });
   } else if (!email.match(emailRegex)) {
     errors.push({
       msg: "Neteisingas el. pašto formatas!"
     });
   }

   if (errors.length > 0) {
     res.render("apie", {
       errors,
       email,
       subject,
       message
     });
   } else {

     let mailOption = {
       from: email,
       to: "semeevel@gmail.com",
       subject: subject,
       text: email + message
     };
     transporter.sendMail(mailOption, function(err, data) {
       if (err) {
         console.log(err);
       } else {
         console.log("Email sent");
       }
     });
     errors.push({
       msg: "Žinutė išsiųsta!"
     });
     res.render("apie", {
       errors
     });
   }
 });

 router.get("/dashboard", ensureAuthenticated, function(req, res) {
   Reservation.find({}, function(err, reservation) {
     if (err) {
       console.log(err);
     } else {
       res.render("dashboard", {
         reservation: reservation
       });
     }
   });
 });



 module.exports = router;
