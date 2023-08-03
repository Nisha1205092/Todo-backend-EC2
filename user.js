const mongoose = require('mongoose');

// Define schema for user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };