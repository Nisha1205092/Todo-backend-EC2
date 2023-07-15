const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    id: Number,
    title: String,
    completed: Boolean,
    description: String
})

const Todos = mongoose.model('Todos', todosSchema)

const fetchAllTodos = async () => {
    const todos = await Todos.find();
    console.log({ todos })
    if (todos.length === 0) {
        console.log('no todos')
    }
    return todos;
}

const saveATodo = async ({ title, completed, description }) => {
    const newTodo = new Todos({ title, completed, description })
    await newTodo.save()
    return newTodo._id
}

module.exports = {
    Todos,
    fetchAllTodos,
    saveATodo,
}