const mongoose = require('mongoose');

// Define schema for todo
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    important: { type: Boolean, default: false, required: true },
    creationDate: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now },
    deadlineDate: Date,
    images: { type: [String], default: ['string1', 'string2'] },
    tags: { type: [String], default: ['personal'] },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo }