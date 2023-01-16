const fs = require("fs");
const path = require('path')

// asset Encoder function
function encodeAsset() {
  // Read image directory
  const images = fs.readdirSync('./assets')
  if (images.length < 0) return  "No contents found in this directory" 

  // verify if asset ends with either
  const re = /(\.png|\.jpg|\.jpeg)$/i;
  
  for (image of images) {
    // check file extensions
    if (re.test(image)) {
      // encode contents
      const encodedAssetsPath = path.join(__dirname, 'assetsEncoded')
      try {
        if (fs.existsSync(encodedAssetsPath)) {
          const encodedImage = path.join(__dirname, `assetsEncoded/${image}`)
          const imagesHexEncode = new Buffer(image).toString('hex')
          const save = `${imagesHexEncode}\n`
          // first clear content
          fs.truncate('assetsEncoded/encoded.txt', 0, function(){
              // append contents
            fs.appendFileSync('assetsEncoded/encoded.txt', save, 'utf-8')
          })
        }
      }catch(err){
        console.log(err.message)
      }
    }
  }
}

encodeAsset()
