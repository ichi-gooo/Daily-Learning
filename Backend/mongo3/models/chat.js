const { text } = require('express');
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type: String,
        required: true
    },

    to : {
        type: String,
        required: true
    },
    text: {
        type: String,
        maxLength: 500
    },
    created_at: {
        type: Date
    }
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;