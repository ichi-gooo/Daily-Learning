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

const checkToken = app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if(token === "giveaccess"){
    next();
  }
  res.send("Access Denied!");
});



app.get("/api", checkToken, (req, res) => {
  res.send("data");
});

app.use((req, res, next) => {
  req.time = new Date(Date.now());
  console.log(req.method, req.hostname, req.time);
  next();
});

app.get("/", (req, res) => {
  res.send("root");
});

app.get("/random", (req, res) => {
  res.send("Random");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => {
  console.log("Server is running");
});
