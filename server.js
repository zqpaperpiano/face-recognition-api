const express = require('express');
const app = express();

const PORT = process.env.PORT;

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const imageCount = require('./controllers/imageCount');
const getUser = require('./controllers/getUser')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        post: 3306,
        user: 'root',
        password: '',
        database: 'smartbrain'
    }
});

console.log(process.env);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, knex, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {getUser.getUser(req, res, knex)})

app.put('/image', (req, res) => {imageCount.imageCount (req, res, knex)})

app.post('/imageurl', (req, res) => {imageCount.handleFRCall(req, res)})

app.listen(3000, () => {
    console.log(`now listening on 3000`);
})