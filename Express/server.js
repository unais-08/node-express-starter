const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

// Middlewares

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
