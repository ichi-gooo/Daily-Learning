const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
  .then(() => {
    console.log("connection sucessful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index", { chats })
})

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
  let { from, to, text } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    text: text,
    created_at: new Date()
  })
  newChat
    .save()
    .then(res => {
      console.log("Chat saved successfully!")
    })
    .catch(err => {
      console.log(err)
    });
  res.redirect("/chats");
})

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id)
  res.render("edit.ejs", { chat })
})

//update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let newtext = req.body.text;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { text: newtext },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get('/', (req, res) => {
  res.send("Root is working!");
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});