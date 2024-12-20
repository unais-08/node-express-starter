require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { registerRoute, authRoute, employeeRoute } = require("./routes/index");
const connectDB = require("./config/dbConnection");
// const { logger, logEvents, errorHandler } = require("./middleware/index");
const app = express();
const PORT = 8000 || process.env.PORT;

//connect to MongoDB
connectDB();

// Middlewares
// app.use(logger); /* when i use in browser Fetch call get immediately perish after calling*/
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS

//use employee route
app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);

// app.use(errorHandler);
// Start the server

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
});
