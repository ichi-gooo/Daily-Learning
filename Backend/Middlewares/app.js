const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

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
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
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

app.get("/err", (req, res) => {
  abcd = abcd;
});

app.use("/admin", (req, res) =>{
  throw new ExpressError(403, "Access is forbidden");
});

app.use((err, req, res, next) => {
  let {status=500,message} = err;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => {
  console.log("Server is running");
});
