const {
    updateTodo,
    fetchAllTodos
} = require('../utils/utils');
const {
    verifyUser
} = require('../middlewares/myMiddlewares');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');

const getAllTodos = async (req, res) => {
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
}

const editTodo = async (req, res) => {
    // if user email is found
    if (req.user) {
        await updateTodo(req, res);
    } else {
        return res.status(404).json({ message: 'emailNotFound' })
    }
}

const deleteTodo = async (req, res) => {
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
}

module.exports = {
    getAllTodos,
    editTodo,
    deleteTodo
}