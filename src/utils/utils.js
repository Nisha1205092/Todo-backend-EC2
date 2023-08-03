// const mongoose = require('mongoose');

const { User } = require('../models/user');
const { Todo } = require('../models/todo');

const fetchAllTodos = async (todoList) => {
    const todos = await Promise.all(
        todoList.map(async (item) => {
            try {
                const todo = await Todo.findById(item);
                return todo;
            } catch (err) {
                console.log('todo not found:', item);
                return null;
            }
        })
    );

    // Filter out any null values from todos array (failed findById calls)
    return todos.filter((todo) => todo !== null);
};

const createUser = async (req, res) => {
    const { email, uid } = req.body;
    const username = email.split('@')[0].toUpperCase()
    const user = await User.findOne({ email })

    console.log({ user })
    // this is improbable
    // using firebase auth
    // we handle this case in the frontend
    if (user) {
        return res.status(403).json({ message: 'User already exists' })
    }
    const newUser = new User({ username, email, uid })
    newUser.save()
    return res.json({ message: 'User created successfully' })
}

const updateTodo = async (req, res) => {
    const todoId = req.params.todoId;
    /*
    By default, when using findByIdAndUpdate(), 
    the method returns the original document before the update was applied. 
    However, by setting { new: true }, 
    we instruct the method to return the modified document instead.
    */
    try {
        const todo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true })
        return res.json({ message: 'todo updated successfully' })
    } catch (error) {
        return res.status(404).json({ message: 'Todo not found' })
    }
}

const findUser = async (email) => {
    const user = await User.findOne({ email })
    if (user) {
        return user;
    }
    return null;
}

// const saveATodo = async ({ title, completed, description }) => {
//     const newTodo = new Todo({ title, completed, description })
//     await newTodo.save()
//     return newTodo._id
// }

module.exports = {
    findUser,
    fetchAllTodos,
    createUser,
    updateTodo,
}