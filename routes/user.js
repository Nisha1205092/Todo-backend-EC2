const express = require('express')
const router = express.Router()
const {
    fetchAllTodos,
    createUser,
} = require('../utils')
const { verifyUser } = require('../utils')

// we can cut off the common part `/user` from the endpoints
// user signs up
// create a user document
router.post('/signup', (req, res) => {
    // create a user document in MongoDB
    createUser(req, res);
})

// user signs in
// READ all the todos
router.get('/signin', verifyUser, async (req, res) => {
    console.log({ user: req.user })
    if (req.user) {
        console.log('number of todos', req.user.todoList.length)
        const todos = await fetchAllTodos(req.user.todoList);
        return res.json({
            message: 'user signed in',
            todos
        })
    }
    return res.status(404).json({ message: 'emailNotFound' })
    //fetchAllTodos(user)
})

module.exports = router;
