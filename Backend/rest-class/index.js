const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "John",
        content: "I love programming!"
    },

    {
        id: uuidv4(),
        username: "ichigooo",
        content: "JavaScript is my favorite language!"
    },
    
    {
        id: uuidv4(),
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
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post: post });
});

app.patch("/posts/:id" ,(req,res)=> {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> p.id === id);
    post.content = newContent;
    console.log(post);
    res.send("Patch request is working successfully!");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p)=> p.id === id);
    res.render("edit.ejs", { post: post });

});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
