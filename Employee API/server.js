const express = require("express");
const cors = require("cors");
const employeeRouter = require("./routes/employees");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const app = express();
const PORT = 8000 || process.env.PORT;

// Middlewares
// app.use(logger); when i use in browser Fetch call get immediately perish after calling
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS

//use employee route
app.use("/api/employees", employeeRouter);

// app.use(errorHandler);
// Start the server
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
