const {
    fetchAllTodos,
    createUser,
} = require('../utils/utils')

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

const createNewUser = (req, res) => {
    // create a user document in MongoDB
    createUser(req, res);
}

module.exports = {
    getAllTodos,
    createNewUser
}