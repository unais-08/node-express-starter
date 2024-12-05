// Import the 'fs' module to work with the filesystem
const fs = require("fs");

/*
 * Example: Using Readable Streams
 *
 * A readable stream reads data from a file in chunks, which is useful for handling
 * large files efficiently without loading the entire content into memory.
 */

// Step 1: Create a Readable Stream to read data from 'number.txt'
const readableStream = fs.createReadStream("number.txt", {
  encoding: "utf8", // Automatically decode chunks into strings
  highWaterMark: 16, // Limit each chunk to 16 bytes
});

// Step 2: Handle 'data' event to process each chunk of data
readableStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk); // Logs each chunk of data read from the file
});

// Step 3: Handle 'end' event to detect when reading is complete
readableStream.on("end", () => {
  console.log("File reading completed."); // Indicates the entire file has been read
});

// Step 4: Handle 'error' event to catch any errors during the read process
readableStream.on("error", (err) => {
  console.error("Error reading file:", err); // Logs any errors that occur
});

/*
 * Example: Using Writable Streams
 *
 * A writable stream writes data to a file in chunks, allowing for efficient
 * file creation or modification.
 */

// Step 5: Create a Writable Stream to write data to 'output.txt'
const writableStream = fs.createWriteStream("output.txt");

// Step 6: Write data in chunks to the writable stream
writableStream.write("Hello, world!\n"); // Writes the first line to the file
writableStream.write("This is the second line.\n"); // Writes the second line to the file

// Step 7: End the writable stream and handle the 'finish' event
writableStream.end(() => {
  console.log("File writing completed."); // Indicates that writing is finished
});

// Step 8: Handle 'error' event to catch any errors during the write process
writableStream.on("error", (err) => {
  console.error("Error writing to file:", err); // Logs any errors that occur
});

/*
 * Example: Using the 'pipe()' Method
 *
 * The 'pipe()' method connects a readable stream to a writable stream,
 * automatically managing the flow of data and backpressure.
 */

// Step 9: Create a new Readable Stream to read from 'number.txt'
const readableStreamForPipe = fs.createReadStream("number.txt", {
  encoding: "utf8", // Automatically decode chunks into strings
});

// Step 10: Create a new Writable Stream to write to 'output.txt'
const writableStreamForPipe = fs.createWriteStream("output.txt");

// Step 11: Use the 'pipe()' method to transfer data directly
readableStreamForPipe.pipe(writableStreamForPipe);

// Step 12: Handle the 'finish' event to detect when piping is complete
writableStreamForPipe.on("finish", () => {
  console.log("File copied successfully!"); // Confirms successful file copying
});
