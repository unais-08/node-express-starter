const logEvents = require("./logs/logEvent");
const EventEmitter = require("events");
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
class MyEmitter extends EventEmitter {}

//initialize object
const MyEventEmitter = new MyEmitter();

//add listener for the log events
MyEventEmitter.on("log", (msg) => logEvents(msg));

// Middleware to log each request
app.use((req, res, next) => {
  const logMessage = `Method: ${req.method}\tURL: http://localhost:${PORT} ${req.url}`;
  MyEventEmitter.emit("log", logMessage);
  next();
});

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
  MyEventEmitter.emit("log", "Served: / (Home page)");
});
app.get("/world", (req, res) => {
  res.send("World 7...");
  MyEventEmitter.emit("log", "Served: /world");
});
app.get("/about", (req, res) => {
  res.send("about...");
  MyEventEmitter.emit("log", "Served: /about");
});
app.post("/about", (req, res) => {
  res.send("<h1>POST ...</h1>");
});
app.get("*", (req, res) => {
  MyEventEmitter.emit("log", "Not Found");
});

app.listen(PORT, () => {
  console.log(`listening on http://127.0.0.1:${PORT}`);
});
