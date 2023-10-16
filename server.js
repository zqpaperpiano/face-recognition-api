const express = require('express');
const app = express();
require("dotenv").config();

const PORT = 10000;

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const imageCount = require('./controllers/imageCount');
const getUser = require('./controllers/getUser')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ziqingong2021:Eisuke0111@cluster0.eoxfxeh.mongodb.net/"
);




app.use(express.json());
app.use(cors());

var User = require('./Schema/registrationSchema.js');

app.get('/', (req, res) => {
  // res.json('hello');
  User.find({})
  .then(data => res.json(data))
  .catch(err => {
    res.json("error!: ", err);
    console.log("Error occured, " + err)});
});

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {getUser.getUser(req, res)})

app.put('/image', (req, res) => {imageCount.imageCount (req, res)})

app.post('/imageurl', (req, res) => {imageCount.handleFRCall(req, res)})

app.listen(PORT || 10000, () => {
    console.log(`now listening on ${PORT}`);
})