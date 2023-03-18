////////////////////////////////////////////////////////////////////////
// Attention!
// You should not execute this file here, but rather copy it
// inside the scripts/ directory of a newly inited hardhat project.
////////////////////////////////////////////////////////////////////////

// Exercise 0. Learn how to run this file.
//////////////////////////////////////////

// Text below taken from official hardhat template:

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// Try to execute this file in both ways and check which one is faster.
// Then comment the return statement below and proceed with something more
// interesting.

const hre = require("hardhat");
console.log('Hardhat\'s default network:', hre.config.defaultNetwork);


// Exercise 1. Understand Ethers in Hardhat.
////////////////////////////////////////////

// You have learned already how to use Ethers V6. Good!
// Unfortunately, Ethers V6 was released in Feb 2023, and Hardhat has not yet
// caught up. The default version of Ethers in Hardhat is V5, but V6 is 
// currently being developed. For now you need to adapt to the V5 syntax.
// No worries, it's quite similar.

// a. Require ethers and print the version of Ethers, just to be sure.

// Your code here!
const ethers = require("ethers");
console.log("Version ethers.js:", ethers.version);

// b. Hardhat uses v5 because it offers a plugin that is a wrapped version of
// Ethers which makes things a little easier. This is available under
// hre.ethers (require statement above).
// Print the version of this plugin, it should be the same as above.

// Your code here!
console.log("Version wrapped ethers.js:", hre.ethers.version);

// Exercise 1. Create a new Solidity contract.
//////////////////////////////////////////////

// We haven't fully understood the Lock contract and we are already creating
// a new one? Yes, it's quite easy. 

// a. Copy the contract file "Lock.sol" and rename creatively it as "Lock2.sol".

// b. Copy the deployment script "deploy.js" and repeat the same creative
// act by renaming it into "deploy2.js".

// c. Important! The name of a contract is not the name of the file, it is
// the name of the contract inside the file. Go on and rename the contract
// name "Lock" into "Lock2" inside both "Lock2.sol" and "deploy2.js".

// d. Deploy the "new" contract.

// Exercise 2. Interact with your new Solidity contract (READ).
///////////////////////////////////////////////////////////////

// If you remember from 3_EtherJS/2_signer.js, to interact with a smart 
// contract you need three pieces of information:
// 1. The contract address.
// 2. The ABI
// 3. A signer (with access to a provider)

// Here it is the same, however the Hardhat wrapped version of Ether makes
// things a bit easier, as I mentioned above.

// a. Update with your contract's name and address.
// Hint: The address is known only after deployment.
//       --> It is stated in the console after deploying the contract
const contractName = "Lock2";
// const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractAddress = "0xaaBf932Cb7838F54b0B7Fc67e81d1a30c76C8F22";


// Let's continue inside the async main function (the recommended Hardhat
// pattern of execution).

async function main() {
  
  // b. Get the first of the default Hardhat signers. Print its address, and
  // checks that it matches the first address printed to console when you
  // execute: npx hardhat node
  // Hint: hre.ethers.getSigners() returns an array.

  // Your code here!
  let DefSigners = await hre.ethers.getSigners();
  let firstDefSigner = DefSigners[0];
  console.log("Adress:", firstDefSigner.address);
  console.log("|--> matches #0");


  // c. Get your new contract. Hardhat Ethers automatically fetches the ABI from
  // the artifacts, so you don't need to specify it. Use the method
  // hre.ethers.getContractAt(<name>, <address>, <signer>)
  // then print the contract address.

  // Your code here!
  let lock = await hre.ethers.getContractAt(contractName, contractAddress, firstDefSigner);
  console.log("Contract Address:", lock.address);

  // d. Bonus. You can get the contract also without Hardhat's wrapped Ethers.
  // The standard (here V5) Ethers.JS requires a bit more code, but is is 
  // useful to understand how it works.

  const getContractManual = async(signer = hhSigner, 
                                  address = contractAddress) => {
    
    // d.1 Fetch the ABI from the artifacts 
    // (it expects contract name = file name).

    // Your code here!

    // d.2 Create the contract and print the address.

    // Your code here!

    // const lock = ... ;

    return lock;

  };

  // const lock2 = await getContractManual();
  
  // e. Print out the public variables of the contract: owner and unlockTime.
  // Hint: Public variables have automatic getters that can be invoked.

  const readContract = async (lockContract = lock) => {
      
    // Print the owner of the lock.
   
    // Your code here!
    console.log("Owner:", await lock.owner());

    // Print the unlock time. 
    // Be careful! You will get a BigInt, you need first
    // to convert it to a Number and then to a Date so that it is readable.
    // For the conversions these threads might help:
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    // https://stackoverflow.com/questions/53970655/how-to-convert-bigint-to-number-in-javascript
    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }
    // Your code here!
    let bigNum = await lock.unlockTime();
    let unixTime = Number(bigNum);
    let unlockTime = timeConverter(unixTime);
    console.log("Unlock Time:", unlockTime);
  };

  await readContract();
 
  
  // Exercise 3. Interact with your new Solidity contract (WRITE).
  ////////////////////////////////////////////////////////////////

  // a. Let's try to withdraw from the lock. 
  // Print the balance before and after withdrawal.
  // Hint: Invoke the asynchronous withdraw method.
  // Hint2: Ethers V5 Syntax for accessing formatEther:
  // balance = ethers.utils.formatEther(balance);
  // Hint3: Do you get an error? You should! Check in the long error msg,
  // the reason why.

  const withdrawAttempt1 = async (lockContract = lock) => {
        
    // Your code here!
    let rawBalanceBefore = await firstDefSigner.getBalance();
    let balanceBefore = ethers.utils.formatEther(rawBalanceBefore);
    console.log("Balance before:", balanceBefore);

    await lockContract.withdraw();

    let rawBalanceAfter = await firstDefSigner.getBalance();
    let balanceAfter = ethers.utils.formatEther(rawBalanceAfter);
    console.log("Balance after:", balanceAfter);
  };

  // console.log("NEW ATTEMPT");
  // await withdrawAttempt1();
  
  // Exercise 3. Remove the check for unlock date (WRITE).
  ////////////////////////////////////////////////////////////////////

  // a. Comment out the require checking for the unlock date.

  // b. Deploy the Lock2 contract again and try to withdraw now.
  // Hint: the contract address will be different.
  
  const withdrawAgain = async() => {
    const newContractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

    // Wrapped Ethers.
    const newLock = await hre.ethers.getContractAt(contractName,
                                                   newContractAddress,
                                                   firstDefSigner);
    
    // Standard Ethers (V5).
    // const newLock = await getContractManual(firstDefSigner, newContractAddress);
    
    // Can also print:
    console.log(newLock.address);
    await readContract(newLock);  

    await withdrawAttempt1(newLock);
  };
  
  console.log("WITHDRAW AGAIN")
  // await withdrawAgain();


  // Exercise 4. Bonus. Connect with another address (WRITE).
  //////////////////////////////////////////////////////////

  // Redeploy the Lock2 contract and try to withdraw from an address that
  // is not the owner now. It should trigger an error from the second
  // `require` statement in the withdraw method.

  const triggerNotOwner = async () => {
    
    // b.1 Add the RPC url as shown after starting `npx hardhat node`
    const hardhatUrl = "FILL_THIS_VALUE";
    // v5
    const hardhatProvider = new ethers.providers.JsonRpcProvider(hardhatUrl);
    // For your reference, in v6 we used:
    // const hardhatProvider = new ethers.JsonRpcProvider(hardhatUrl);

    // b.2 Require the `dotenv` package.
    // For execution with npx you need to specify the path from the directory 
    // of execution. E.g., if you execute from 4_Hardhat/:
    require('dotenv').config({ path: "../.env" });

    // b.3 Create a new signer.
    
    // Your code here!

    // b.4 Get the contract instance and then try to withdraw.
    // Hint: You could use the method `getContractManual` created before

    // Your code here!
    
  };

  // await triggerNotOwner();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
