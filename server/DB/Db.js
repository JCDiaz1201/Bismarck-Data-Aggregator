// const mongoDb = require("./config/db.mongoConfig");
const igDb = require("./config/ig.db.mongoConfig");
const twtDb = require("./config/twt.db.mongoConfig");
const tumbDb = require("./config/tumb.db.mongoConfig");

let insertIgData = dataArray => {
  console.log(dataArray);

  for (let index = 0; index < dataArray.length; index++) {
    let newItem = {
      post: dataArray[index].caption
    };
    igDb.mongoDatabase.insertOne(newItem, (err, results) => {
      if (err) {
        return error;
      }
    });
  }
};

let insertTwtData = dataArray => {
  console.log(dataArray);

  for (let index = 0; index < dataArray.length; index++) {
    let newItem = {
      post: dataArray[index]
    };
    twtDb.mongoDatabase.insertOne(newItem, (err, results) => {
      if (err) {
        return error;
      }
    });
  }
};

let insertTumbData = dataArray => {
  console.log(dataArray);

  for (let index = 0; index < dataArray.length; index++) {
    let newItem = {
      post: dataArray[index]
    };
    tumbDb.mongoDatabase.insertOne(newItem, (err, results) => {
      if (err) {
        return error;
      }
    });
  }
};

module.exports = { insertTwtData, insertIgData, insertTumbData };
