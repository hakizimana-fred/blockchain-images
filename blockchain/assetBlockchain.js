const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(data) {
    this.hash = "";
    this.time = 0;
    this.body = data;
    this.size = 0;
    this.previousBlockHash = "";
  }
}

class Blockchain {
  constructor() {
    this.chain = [];
    // First block transaction
    this.addBlock(this.genesisBlock());
  }

  // Add transactions
  addBlock(newBlock) {
    newBlock.time = new Date().getTime();
    newBlock.size = this.chain.length;
    // get previous hash if chain is > 0
    if (this.chain.length > 0) {
      newBlock.previousBlockHash = this.chain[this.chain.length - 1].hash;
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    this.chain.push(newBlock);
  }

  genesisBlock() {
    return new Block("Genesis data");
  }
}

module.exports = {
  Blockchain,
  Block,
};
