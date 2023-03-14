// Ethers JS: First interaction with Hardhat blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// Your code here!
require('dotenv').config();
const ethers = require("ethers");

// Exercise 1. Create a JSON RPC Provider for the Hardhat blockchain.
/////////////////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

// Your code here!
const hardhatProvider = new ethers.JsonRpcProvider(process.env.HARDHAT_URL);
console.log(hardhatProvider);

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// Hardhat Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
   
    // Your code here!
    let network = await hardhatProvider.getNetwork();
    console.log(network);

    console.log("Name:", network.name);
    console.log("Chain ID:", network.chainId);
    let blockNr = await hardhatProvider.getBlockNumber();
    console.log("Block Number:", blockNr);
};

networkInfo();

// Exercise 3. Connect a signer to the Hardhat blockchain.
//////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

let hhPrivateKey = "de9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0";

// Your code here!
let connectedSigner = new ethers.Wallet(hhPrivateKey, hardhatProvider);
console.log("Signer:", connectedSigner);

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {

    // Your code here!
};

// getNonce();
return;

// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

    // Your code here!
};

// checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    // Your code here!
};

// sendTransaction();

