/**
 * File Operations Example using Node.js
 * This script demonstrates common file operations such as reading, writing, appending,
 * checking file existence, and deleting a file using Node.js's File System module.
 */

const fs = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    // Define file paths
    const filePath = path.join(__dirname, "lorem.txt"); // File to read from
    const writePath = path.join(__dirname, "PromisesWrite.txt"); // File to write into
    const appendPath = path.join(__dirname, "newFile.txt"); // File to append content
    const renamePath = path.join(__dirname, "renameFile.txt"); // New name for renaming a file
    const dummyPath = path.join(__dirname, "dummyFile.txt"); // File to rename

    // Step 1: Read content from 'lorem.txt'
    const data = await fs.promises.readFile(filePath, "utf8");
    console.log("File Read complete.");

    // Step 2: Write the read content to 'PromisesWrite.txt'
    await fs.promises.writeFile(writePath, data);
    console.log("File write complete.");

    // Step 3: Append new content to 'newFile.txt'
    await fs.promises.appendFile(appendPath, " My name is Unais \n");
    console.log("File append complete.");

    // Step 4: Check if 'newFile.txt' exists before deleting it
    if (fs.existsSync(appendPath)) {
      await fs.promises.unlink(appendPath); // Delete the file
      console.log("File deleted successfully.");
    } else {
      console.log("No such file exists to delete.");
    }

    // Step 5: Check if 'dummyFile.txt' exists before renaming
    if (fs.existsSync(dummyPath)) {
      await fs.promises.rename(dummyPath, renamePath); // Rename the file
      console.log("File renamed successfully.");
    } else {
      console.log("No such file exists to rename.");
    }
  } catch (err) {
    // Handle errors gracefully
    console.error("An error occurred:", err);
  }
};

//create directory

const dirPath = path.join(__dirname, "newDir");

const createDir = async () => {
  try {
    await fs.mkdir(dirPath);
    console.log("Directory created successfully!");
  } catch (err) {
    console.error("Error creating directory:", err);
  }
};
//remove directory
const removeDir = async () => {
  try {
    await fs.rmdir(dirPath);
    console.log("Directory removed successfully!");
  } catch (err) {
    console.error("Error removing directory:", err);
  }
};

// Execute the file operations
fileOps();
createDir();
removeDir();
