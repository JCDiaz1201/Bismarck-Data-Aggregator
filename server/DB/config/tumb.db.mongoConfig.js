const { MongoClient } = require("mongodb");

let myDB = MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

myDB.connect(console.log("Connected to tumblr collection"));
let mongoDatabase = myDB.db("bismarck").collection("tumblrData");

module.exports = { mongoDatabase };
