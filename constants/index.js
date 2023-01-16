const EC = require('elliptic').ec
const ec = new EC('secp256k1');

const DIRECTORIES = {
  assets: "./assets",
  assetsEncoded: "./assetsEncoded",
  encodedTxt: "./encoded.txt",
};

const PRIVATE_KEY = ec.keyFromPrivate(                                                
  "p2wpkh:L1x2JJXmWiYQrNUozBBVRMDLqMuxqaF8QcphbAesiYpZEk3mV5vS"                 
);   
const WALLET_ADDRESS = PRIVATE_KEY.getPublic('hex')

module.exports = {
  DIRECTORIES,
  WALLET_ADDRESS,
  PRIVATE_KEY
};
