const axios = require("axios").default;
const auth = require("../auth/auth.js");
const Twit = require("twit");

let getDataFromTwitter = () => {
  let twitterDataRequest = new Twit({
    consumer_key: auth.twitterAuth.APIKey,
    consumer_secret: auth.twitterAuth.APISecret,
    access_token: auth.twitterAuth.access_token,
    access_token_secret: auth.twitterAuth.access_token_secret
  });

  return new Promise((resolve, reject) => {
    twitterDataRequest
      .get("statuses/user_timeline", {
        screen_name: "BismarckMarquee",
        count: 10,
        tweet_mode: "extended"
      })
      .then(response => {
        let responseArray = response.data;
        let tweetsArray = [];

        if (responseArray.length > 1) {
          for (let tweet = 0; tweet < responseArray.length; tweet++) {
            tweetsArray.push(response.data[tweet].full_text);
          }
        }
        resolve(tweetsArray);
      })
      .catch(error => {
        reject("Error: ", error);
      });
  });
};

module.exports = { getDataFromTwitter };
