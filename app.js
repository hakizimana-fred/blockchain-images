const fs = require("fs");
const path = require("path");
const { Blockchain, Block } = require("./blockchain/assetBlockchain");
const { DIRECTORIES } = require("./constants");

function main() {
  // first encode assets
  encodeAsset();
  return new Promise((resolve, reject) => {
    const lines = [];
    // read encoded data
    fs.readFileSync(`assetsEncoded/encoded.txt`, "utf-8")
      .split(/\r?\n/)
      .forEach(function (line) {
        
        lines.push(line);
      });
    lines.length > 0 ? resolve(lines) : reject("Something went wrong");
  });
}

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
        } else {
          // if file doesn't exist
          fs.mkdirSync(encodedAssetsPath);
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

main()
  .then((data) => {
   const blockchain = new Blockchain()
   for (content of data) {
       if (content !== '') {
         blockchain.addBlock(new Block(content))
       }
   } 
  })
  .catch((err) => console.log(err.message));

