// Dependencies
const express = require("express");
const path = require("path");
const tables = [];
const waitlist = [];

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/api/tables", (req, res) => res.json(tables));
app.get("/api/waitlist", (req, res) => res.json(waitlist));
// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));