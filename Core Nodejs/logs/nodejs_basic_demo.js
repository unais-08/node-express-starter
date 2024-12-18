/*
 * Node.js Basics Demo
 *
 * This script demonstrates the basics of using core Node.js modules:
 * 1. **os**: For operating system-related information.
 * 2. **path**: For handling and formatting file paths.
 * 3. **fs**: For performing file system operations such as reading, writing, appending, and deleting files.
 *
 * This code is beginner-friendly and showcases fundamental Node.js capabilities step-by-step.
 */

// Import required core modules
const fs = require("fs"); // File system module for handling file operations
const path = require("path"); // Path module for handling and formatting file paths
const os = require("os"); // OS module for interacting with the operating system

// Step 1: Using the 'os' module
console.log("** OS Module Basics **");
console.log("Operating System Name:", os.type()); // Prints the operating system name (e.g., Linux, Darwin, Windows)
console.log("Host Name:", os.hostname()); // Prints the computer's hostname
console.log("Platform:", os.platform()); // Prints the platform (e.g., win32, linux)
console.log("Architecture:", os.arch()); // Prints the system architecture (e.g., x64)
console.log(
  "Total Memory (GB):",
  (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
); // Converts bytes to GB
console.log(
  "Free Memory (GB):",
  (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
); // Converts bytes to GB
console.log("Home Directory:", os.homedir()); // Prints the home directory path
console.log("Uptime (Hours):", (os.uptime() / 3600).toFixed(2)); // Prints system uptime in hours
console.log("\n");

// Step 2: Using the 'path' module
console.log("** Path Module Basics **");
console.log("Current Directory:", __dirname); // Prints the directory of the current script
console.log("Current File Path:", __filename); // Prints the full path of the current script
console.log("Base File Name:", path.basename(__filename)); // Prints just the file name (e.g., script.js)
console.log("Directory Name:", path.dirname(__filename)); // Prints the directory name
console.log("File Extension:", path.extname(__filename)); // Prints the file extension (e.g., .js)
console.log("Path Object:", path.parse(__filename)); // Returns an object with details of the file path
console.log("Joined Path:", path.join(__dirname, "example", "test.txt")); // Joins paths into a single valid path
console.log("\n");

// Step 3: Using the 'fs' module for file operations
console.log("** File System Basics **");

// Define file paths
const filePath = path.join(__dirname, "lorem.txt"); // Example input file
const newFilePath = path.join(__dirname, "newFile.txt"); // Example output file

// Create and write to a file
/*This code make the callback hell to insuare the synchronus nature of JS(not recommended)*/
fs.writeFile(newFilePath, "This is a new file created by Node.js!\n", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully.");

  // Append to the file
  fs.appendFile(
    newFilePath,
    "Appended content: Hello from Node.js!\n",
    (err) => {
      if (err) {
        console.error("Error appending to file:", err);
        return;
      }
      console.log("Content appended successfully.");

      // Read the file
      fs.readFile(newFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }
        console.log("File content:\n", data);

        // Delete the file
        fs.unlink(newFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully.");
        });
      });
    }
  );
});
