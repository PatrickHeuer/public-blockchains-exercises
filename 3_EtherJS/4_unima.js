// Ethers JS: First interaction with (not) UniMa blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// Your code here!
require('dotenv').config();
const ethers = require("ethers");

// Exercise 1. Create a JSON RPC Provider for the (not) UniMa Blockchain.
/////////////////////////////////////////////////////////////////////////

// It seems we cannot (yet) call our blockchain the official Uni Mannheim
// blockchain, so we will reference it throughtout the exercises as the
// (not) UniMa Blockchain.

// a. Add the RPC endpoints to the .env with names:
// - NOT_UNIMA_URL_1
// - NOT_UNIMA_URL_2

// Hint: you find the RPC endpoints on the slides in ILIAS.

// b. Create the JSON RPC provider object.
// Hint: only accessible within UniMa network.

// Your code here!
const NUMAProvider = new ethers.JsonRpcProvider(process.env.NOT_UNIMA_URL_1);
console.log(NUMAProvider);


// Exercise 2. Let's query the provider.
////////////////////////////////////////

// (not) UniMa Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
    
    // Your code here!
    let network = await NUMAProvider.getNetwork();
    console.log(network);

    console.log("Name:", network.name);
    console.log("Chain ID:", network.chainId);
    let blockNr = await NUMAProvider.getBlockNumber();
    console.log("Block Number:", blockNr);

};

networkInfo();

// Exercise 3. Connect a signer to the (not) UniMa blockchain.
//////////////////////////////////////////////////////////////

// a. Use the same non-sensitive private key used in 3_signer.js.

// Your code here!
let connectedSigner = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, NUMAProvider);
console.log("Signer:", connectedSigner);


// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {
    
    // Your code here!
    let nonce = await connectedSigner.getNonce();
    console.log("Nonce:", nonce);
};

getNonce();

// Checkpoint. Is the nonce in the (not) Unima blockchain different
// than in Goerli?

//Yes, because the network has not been used for as many transactions as the Goerli Network by me


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

   // Your code here!
   let balance = await NUMAProvider.getBalance(connectedSigner.address);
   console.log("Balance:", ethers.formatUnits(balance));
};

checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

   // Your code here!
   const unsignedTransaction = {
    to: account2,
    value: ethers.parseEther("1"),
    };
    let tx = await connectedSigner.sendTransaction(unsignedTransaction);
    console.log('Transaction is in the mempool...');
    await tx.wait();

    console.log('Transaction mined!');
    console.log("Transaction:", tx);
};

sendTransaction();
return;

// Checkpoint. Can you send your ETH from NUMA to Goerli?

// No, that shouldn't be possible

