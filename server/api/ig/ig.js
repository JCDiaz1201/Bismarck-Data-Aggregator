const axios = require("axios").default;
const auth = require("../auth/auth.js");

let getDataFromInstagram = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://graph.instagram.com/me/media?fields=id,caption&access_token=${auth.igAuth}`
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject("Error: ", error);
      });
  });
};

module.exports = { getDataFromInstagram };
