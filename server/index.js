require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// middlewares always work from top to bottom
app.use(bodyParser.json());
app.use(cors());
// for all the static html, css, js, image etc
// inside public, index.html is by default loaded 
// at http://localhost:3000
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const userRoutes = require('./src/routes/user')
const todoRoutes = require('./src/routes/todo')
app.use('/user', userRoutes)
app.use('/user/todo', todoRoutes)

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));