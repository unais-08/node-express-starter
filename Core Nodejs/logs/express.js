const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express m</h1>`);
});
app.get("/about", (req, res) => {
  res.send(`<h1>I ddam express from Nodejs framework of ECMAjavascript.</h1>`);
});
app.get("/about", (req, res) => {
  res.send(`<h1>I ddam express from Nodejs framework of ECMAjavascript.</h1>`);
});



app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
