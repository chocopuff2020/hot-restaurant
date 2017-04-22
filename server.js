var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


/*==================================
=            TABLE DATA            =
==================================*/

var reservationList = [];
var waitlistData = [];

/*=====  End of TABLE DATA  ======*/


// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});
app.get("/api/waitlist", function(req, res) {
  res.send(waitlistData);
});
app.get("/api/tables", function(req, res) {
  res.send(reservationList);
});

app.post("/api/tables", function(req, res) {
  var newTable = req.body;
  // newTable.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  console.log(newTable);
  if (reservationList.length <= 5) {
      reservationList.push(newTable);
      res.json(newTable);
  } else {
      waitlistData.push(newTable);
      res.json(newTable);
  }
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});