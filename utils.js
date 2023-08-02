const mongoose = require('mongoose');

// Define schema for user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

// Define schema for todo
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, required: true },
    important: { type: Boolean, default: false, required: true },
    creationDate: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now },
    deadlineDate: Date,
    images: { type: [String], default: ['string1', 'string2'] },
    tags: { type: [String], default: ['personal'] },
});

// Create models for user and todo
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

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

// middleware
const verifyUser = async (req, res, next) => {
    const email = req.headers.email;
    console.log({ email })
    const user = await findUser(email);
    req.user = user;
    next()
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

// const findUser = async (email) => {
//     const user = await User.findOne({ email })
//     if (user) {
//         return user;
//     }
//     return null;
// }

// const saveATodo = async ({ title, completed, description }) => {
//     const newTodo = new Todo({ title, completed, description })
//     await newTodo.save()
//     return newTodo._id
// }

module.exports = {
    Todo,
    User,
    fetchAllTodos,
    createUser,
    verifyUser,
    updateTodo,
}