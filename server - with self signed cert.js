const https = require("https");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

//const DEFAULT_PORT = process.env.PORT || 3000;

// initialize express.
const app = express();

// Initialize variables.
// let port = DEFAULT_PORT;
let port = 4000; // HTTPS default port

const options = {
  key: fs.readFileSync("selfsigned.key"),
  cert: fs.readFileSync("selfsigned.crt"),
};

// Configure morgan module to log all requests.
app.use(morgan("dev"));

// Setup app folders.
app.use(express.static("app"));

// Set up a route for index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https.createServer(options, app).listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Start the server.
// app.listen(port);
// console.log(`Listening on port ${port}...`);
