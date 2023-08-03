require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')
app.use('/user', userRoutes)
app.use('/user/todo', todoRoutes)

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));