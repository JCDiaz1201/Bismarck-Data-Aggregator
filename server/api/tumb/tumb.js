const axios = require("axios").default;
const auth = require("../auth/auth.js");
const tumblr = require("tumblr.js");

const client = tumblr.createClient({
  credentials: {
    consumer_key: auth.tumblrAuth.consumer_key,
    consumer_secret: auth.tumblrAuth.consumer_secret,
    token: auth.tumblrAuth.token,
    token_secret: auth.tumblrAuth.token_secret
  },
  returnPromises: true
});

let getDataFromTumblr = () => {
  let responseArray = [];
  return new Promise((resolve, reject) => {
    client
      .blogPosts("bismarckmarquee", { type: "text" })
      .then(function(response) {
        let responseObject = response.posts;
        for (let post = 0; post < responseObject.length; post++) {
          responseArray.push(responseObject[post].body);
        }
        resolve(responseArray);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

module.exports = { getDataFromTumblr };
