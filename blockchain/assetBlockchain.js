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
    this.genesisBlock();
  }

  // Add transactions
  addBlock(newBlock) {
    console.log(newBlock);
  }

  genesisBlock(data) {
    return new Block(data);
  }
}
