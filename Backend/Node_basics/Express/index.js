const express = require('express');
const app = express();

let port = 3000;
app.listen(port,() => {
    console.log(`app is listening on port ${port}`);
})



// app.use((req,res)=>{
//     console.log("request received");
//     let code ="<h1>Hello World</h1>";
//     res.send(code);
//     // console.log(req);
// });

app.get("/",(req,res)=>{
   res.send("root path");
});

app.get("/:username/:id",(req,res)=>{
    console.log(req.params);
    res.send("root path");
});

app.get("/search",(req,res) => {
    let {qs} = req.query;
    res.send(`you searched for ${q}`);
});