const express = require("express");
const app = express();
const doctorsRoutes = require("./router/doctors");
const userRoutes = require("./router/user");
const nurseRoutes = require("./router/nurse");
const receptionRoutes = require("./router/reception");
const opcRoutees = require("./router/opc");
const serviceRoutes = require("./router/service");
const roomRouter = require("./router/room");
const medicineRouter = require("./router/medicine");
const patientRoutes = require("./router/patient");
const caseMangeRoutes = require("./router/case-mange");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");



const mongoDbUrl = 'mongodb://ahms:asd123@ds127536.mlab.com:27536/anhms'


mongoose.connect('mongodb://localhost:27017/ahms', { useNewUrlParser: true }, (err, db) => {
  if (err) {
    return console.log('not connected to db',error)
  }
  console.log('connected to local db');
})

// mongoose.connect(mongoDbUrl, { useNewUrlParser: true }, (err, client) => {
//   if (err) {
//     return console.log("unable to connect to mongodb server");
//   }

//   console.log("conected to mongo db");
// });

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use("/doctors", doctorsRoutes);
app.use("/users", userRoutes);
app.use("/reception", receptionRoutes);
app.use("/nurse", nurseRoutes);
app.use("/opc", opcRoutees);
app.use("/service", serviceRoutes);
app.use("/room", roomRouter);
app.use("/medicine", medicineRouter);
app.use("/patient", patientRoutes);
app.use("/casemange", caseMangeRoutes);

module.exports = app;
