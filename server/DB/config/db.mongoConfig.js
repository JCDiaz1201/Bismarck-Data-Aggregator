const { MongoClient } = require("mongodb");

let myDB = MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

myDB.connect(console.log("Connected to mongoTest"));
let mongoDatabase = myDB.db("bismarck").collection("data");

module.exports = { mongoDatabase };
