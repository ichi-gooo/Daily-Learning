const express = require('express');
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: "1a",
        username: "John",
        content: "I love programming!"
    },

    {
        id: "2b",
        username: "ichigooo",
        content: "JavaScript is my favorite language!"
    },
    
    {
        id: "3c",
        username: "pewpew",
        content: "i got selected for my dream job!"
    }
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
})

app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    posts.push({username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post: post });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
