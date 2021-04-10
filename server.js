// Dependencies
const express = require("express");
const path = require("path");
const tables = require("./data-routes/table-data");
const waitlist = require("./data-routes/reservation-data");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/tables.html"))
);
app.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/reserve.html"))
);
app.get("/api/tables", (req, res) => res.json(tables));
app.get("/api/waitlist", (req, res) => res.json(waitlist));

app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newRes = req.body;
  console.log(req.body);
  if (tables.length < 5) {
    tables.push(newRes);
    res.json("Reservation confirmed, we have you at a table");
  } else {
    waitlist.push(newRes);
    res.json(
      "Reservation received, no tables available, but you are on the waiting list"
    );
  }
});

app.delete("/api/tables", (req, res) => {
  console.log(tables);
  tables.shift();
  console.log(tables);
  const next = waitlist.shift();
  console.log(tables);
  tables.push(next);
  console.log(tables);
  res.json(console.log("deleting"));
});

// app.delete(/api/tables, (req, res, val) => {
// const next = tablves[al]
// next.remove
// const newTable = waitlist.unshift
// tables.push(newTable)
// function that removes first index from waitlist and adds to tables
//})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
