const express = require('express')
const router = express.Router()
const {
    updateTodo,
} = require('../utils/utils');
const { verifyUser } = require('../middlewares/myMiddlewares');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { editTodo, deleteTodo, getAllTodos } = require('../controllers/todoController');

// middlewares
router.use(logger)
router.use(verifyUser)

// GET all todos
router.get('/', verifyUser, getAllTodos)

// CREATE todo
router.post('/', verifyUser, async (req, res) => {
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

/*
// UPDATE a todo
router.put('/:todoId', verifyUser, async (req, res) => {
    // if user email is found
    if (req.user) {
        await updateTodo(req, res);
    } else {
        return res.status(404).json({ message: 'emailNotFound' })
    }
})

// DELETE a todo
router.delete('/:todoId', verifyUser, async (req, res) => {
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

// GET a todo
router.get('/:todoId', verifyUser, (req, res) => {
    res.send(`get details of todo ${req.params.todoId}`)
})

*/

router.route('/:todoId')
    .get((req, res) => {
        res.send(`get a particular todo ${req.params.todoId}`)
    })
    .put(editTodo)
    .delete(deleteTodo)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router;