const express = require("express");
const app = express();

// app.use((req,res,next)=>{
//     console.log("middleware");
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("2ndmiddleware");
//     next();
// });


app.use((req,res,next) => {
    req.time = new Date(Date.now());
    console.log(req.method, req.hostname, req.time);
    next();
});



app.get("/",(req,res) => {
    res.send("root");
});

app.get("/random",(req,res)=>{
    res.send("Random");
});

app.listen(8080, () => {
    console.log("Server is running");
})