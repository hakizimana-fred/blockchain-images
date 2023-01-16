const fs = require("fs");
const path = require("path");
const { DIRECTORIES } = require("./constants");

// asset Encoder function
function encodeAsset() {
  // Read image directory
  const images = fs.readdirSync(DIRECTORIES.assets);
  if (images.length < 0) return "No contents found in this directory";

  // verify if asset ends with either
  const re = /(\.png|\.jpg|\.jpeg)$/i;

  for (image of images) {
    // check file extensions
    if (re.test(image)) {
      // encode contents
      const encodedAssetsPath = path.join(__dirname, DIRECTORIES.assetsEncoded);
      try {
        if (fs.existsSync(encodedAssetsPath)) {
          const imagesHexEncode = new Buffer(image).toString("hex");
          const save = `${imagesHexEncode}\n`;
          // first clear content
          fs.truncate(
            `${DIRECTORIES.assetsEncoded}/${DIRECTORIES.encodedTxt}`,
            0,
            function () {
              // append contents
              fs.appendFileSync(
                `${DIRECTORIES.assetsEncoded}/${DIRECTORIES.encodedTxt}`,
                save,
                "utf-8"
              );
            }
          );
        }else {
          // if file doesn't exist
          fs.mkdirSync(encodedAssetsPath)
          const imagesHexEncode = new Buffer(image).toString("hex");
          const save = `${imagesHexEncode}\n`;
          // first clear content
          fs.truncate(
            `${DIRECTORIES.assetsEncoded}/${DIRECTORIES.encodedTxt}`,
            0,
            function () {
              // append contents
              fs.appendFileSync(
                `${DIRECTORIES.assetsEncoded}/${DIRECTORIES.encodedTxt}`,
                save,
                "utf-8"
              );
            }
          );
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }
}

encodeAsset();
