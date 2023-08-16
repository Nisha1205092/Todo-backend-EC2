const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middlewares/myMiddlewares')
const { signinUser, createNewUser } = require('../controllers/userController')

// we can cut off the common part `/user` from the endpoints
// user signs up
// create a user document
router.post('/signup', createNewUser)

// user signs in
// READ all the todos
router.post('/signin', verifyUser, signinUser)

module.exports = router;
