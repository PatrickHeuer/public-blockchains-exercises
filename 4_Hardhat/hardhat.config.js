require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config({path : '../.env'});

const baseURL = process.env.INFURA_GOERLI_API_URL;
const apiKey = process.env.INFURA_KEY;
const completeURL = `${baseURL}${apiKey}`
const acc1 = process.env.METAMASK_1_PRIVATE_KEY;
const etherscanKey = process.env.ETHERSCAN_KEY;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: completeURL,
      accounts: [acc1]
    }
  },
  etherscan: {
    apiKey: etherscanKey
  }
};
