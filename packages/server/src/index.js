const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
var cors = require('cors');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const db = require('./models/index');
db.sequelize
  .authenticate()
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(cors());

app.use(bodyParser.json());

var bookRoute = require('./routes/book');
app.use('/api/book', bookRoute);
var userRoute = require('./routes/user');
app.use('/api/user', userRoute);

const SERVER_PORT = process.env.PORT;
app.listen(SERVER_PORT, () => console.log(`LISTENING ON PORT ${SERVER_PORT}!`));