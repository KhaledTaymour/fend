const port = 3005;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");
const cors = require("cors");

// Cors for cross origin allowance
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allowing cross origin (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain (*) you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
}

// Post Route
app.post("/addNewTemp", postData);

function postData(req, res) {
  let newTempData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  projectData[req.body.zipCode] = newTempData;

  console.log("addNewTemp success", projectData);
  res.send(projectData);
}
