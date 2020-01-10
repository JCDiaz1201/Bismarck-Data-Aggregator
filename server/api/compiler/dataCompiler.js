const igDb = require("../../DB/config/ig.db.mongoConfig");
const twtDb = require("../../DB/config/twt.db.mongoConfig");
const tumbDb = require("../../DB/config/tumb.db.mongoConfig");

let igData = [];
let twtData = [];
let tumblrData = [];

let compileData = (data, method) => {
  let instagramResult = 0;
  let twitterResult = 0;
  let tumblrResult = 0;
  let finalResultArray = [];

  let politicalKeyWordObject = {
    trump: 0,
    pelosi: 0,
    mcconnell: 0,
    president: 0,
    maga: 0,
    congress: 0,
    senate: 0,
    court: 0,
    "@speakerpelosi": 0,
    "@realdonaldtrump": 0,
    impeach: 0,
    border: 0
  };

  for (let index = 0; index < data.length; index++) {
    let currentIndexArray = data[index].post.split(" ");

    for (
      let innerIndex = 0;
      innerIndex < currentIndexArray.length;
      innerIndex++
    ) {
      if (
        politicalKeyWordObject.hasOwnProperty(
          currentIndexArray[innerIndex].toLowerCase()
        )
      ) {
        if (method === "ig") {
          instagramResult += 1;
        } else if (method === "twt") {
          twitterResult += 1;
        } else if (method === "tbr") {
          tumblrResult += 1;
        }
      }
    }
  }

  if (method === "ig") {
    finalResultArray.push(instagramResult);
    finalResultArray.push(data.length);
  } else if (method === "twt") {
    finalResultArray.push(twitterResult);
    finalResultArray.push(data.length);
  } else if (method === "tbr") {
    finalResultArray.push(twitterResult);
    finalResultArray.push(data.length);
  }

  return finalResultArray;
};

let gatherData = () => {
  let finalFinalArray = [];
  return new Promise((resolve, reject) => {
    setIgData()
      .then(response => {
        igData = response;
        finalFinalArray.push(compileData(igData, "ig"));
      })
      .then(() => {
        setTwtData()
          .then(response => {
            twtData = response;
            finalFinalArray.push(compileData(twtData, "twt"));
          })
          .then(() => {
            setTumbData()
              .then(response => {
                tumblrData = response;
                finalFinalArray.push(compileData(tumblrData, "tbr"));
              })
              .then(() => {
                resolve(finalFinalArray);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

let setIgData = () => {
  return new Promise((resolve, reject) => {
    igDb.mongoDatabase.find({}).toArray((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

let setTwtData = () => {
  return new Promise((resolve, reject) => {
    twtDb.mongoDatabase.find({}).toArray((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

let setTumbData = () => {
  return new Promise((resolve, reject) => {
    tumbDb.mongoDatabase.find({}).toArray((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { gatherData, compileData };
