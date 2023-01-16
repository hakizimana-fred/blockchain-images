const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(myAddress, amount, data) {
    this.myAddress = myAddress;
    this.amount = amount;
    this.data = data;
    this.time = Date();
  }

  hashTransaction() {
    const transactionData = {
      address: this.myAddress,
      data: this.data,
      amount: this.amount,
    };
    return SHA256(JSON.stringify(transactionData)).toString();
  }

  // sign a transaction with private key
  signTransaction(key) {
    if (key.getPublic("hex") !== this.myAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }
    const hashTx = this.hashTransaction();
    const sig = key.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }
}

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
    this.transaction = [];
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
  addTransaction(tx) {
    this.transaction.push(tx);
  }

  genesisBlock() {
    return new Block("Genesis data");
  }
}

module.exports = {
  Blockchain,
  Block,
  Transaction,
};
