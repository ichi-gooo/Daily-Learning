const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
    .then(() => {
        console.log("connection sucessful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
        to: "preeti",
        text: "Hey, send me the exam notes!",
        created_at: new Date()
    },

    {
        from: "rohit",
        to: "mohit",
        text: "Teach me JS callbacks today.",
        created_at: new Date()
    },

    {
        from: "amit",
        to: "sumit",
        text: "All the best for your interview!",
        created_at: new Date()
    },

    {
        from: "anita",
        to: "ramesh",
        text: "Bring some coffee on your way back.",
        created_at: new Date()
    },

    {
        from: "sahed",
        to: "adam",
        text: "The MongoDB connection is working great!",
        created_at: new Date()
    }
];

Chat.insertMany(allChats); 
