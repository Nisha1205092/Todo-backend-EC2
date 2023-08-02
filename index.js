require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {
    fetchAllTodos,
    createUser,
    verifyUser,
    updateTodo,
    Todo,
    User,
} = require('./utils');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)


// user signs up
// create a user document
app.post('/signup', (req, res) => {
    // create a user document in MongoDB
    createUser(req, res);
})

// user signs in
// READ all the todos
app.get('/user/signin', verifyUser, async (req, res) => {
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

// CREATE todo
app.post('/user/todo', verifyUser, async (req, res) => {
    console.log({ user: req.user })
    if (req.user) {
        // create a todo
        const newTodo = new Todo(req.body)
        await newTodo.save();
        // add the todoId to the corresponding user's
        // todoList array
        req.user.todoList.push(newTodo.id)
        await req.user.save()
        return res.json({ message: 'Todo added successfully' })
    }
    return res.status(404).json({ message: 'emailNotFound' })
})

// UPDATE a todo
app.put('/user/todo/:todoId', verifyUser, async (req, res) => {
    // if user email is found
    if (req.user) {
        await updateTodo(req, res);
    } else {
        return res.status(404).json({ message: 'emailNotFound' })
    }
})

// DELETE a todo
app.delete('/user/todo/:todoId', verifyUser, async (req, res) => {
    // if user email is found
    if (req.user) {
        console.log({ user: req.user })
        try {
            const id = req.params.todoId;
            console.log({ id })
            // delete the entry in the todos collection
            await Todo.findByIdAndDelete(id)
            // delete the id in the users collection as well
            // Delete the todoId from the user.todoList array
            const doc = await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { todoList: id } },
                { new: true } // findOneAndUpdate() will instead give you the object after update was applied.
            )
            // after update
            console.log({ doc })
            return res.send({ message: 'deleted successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete todo.' });
        }
    } else {
        return res.status(404).json({ message: 'emailNotFound' })
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));