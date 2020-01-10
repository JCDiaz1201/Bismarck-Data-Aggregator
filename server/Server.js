const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 5000;

const igApiCall = require("./api/ig/ig");
const twitterApiCall = require("./api/twt/twt");
const tumblrApiCall = require("./api/tumb/tumb");
const dbCalls = require("./DB/Db");
const dataCompilerCall = require("./api/compiler/dataCompiler");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.get("/getinstagram", (req, res) => {
  igApiCall
    .getDataFromInstagram()
    .then(response => {
      dbCalls.insertIgData(response.data);
      res.end();
    })
    .catch(error => {
      res.send("Error: ", error);
    });
});

app.get("/gettwitter", (req, res) => {
  twitterApiCall
    .getDataFromTwitter()
    .then(response => {
      dbCalls.insertTwtData(response);
      res.end();
    })
    .catch(error => {
      res.send("Error: ", error);
    });
});

app.get("/gettumblr", (req, res) => {
  tumblrApiCall
    .getDataFromTumblr()
    .then(response => {
      dbCalls.insertTumbData(response);
      res.end();
    })
    .catch(error => {
      res.send("Error: ", error);
    });
});

app.get("/gatherdata", (req, res) => {
  dataCompilerCall
    .gatherData()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
