var fs = require('fs');

module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync("./archives")) {
    // I use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives");
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync("./archives/sites")) {
    // I use fs.mkdirSync to create the folder
    fs.mkdirSync("./archives/sites");
  }
};
