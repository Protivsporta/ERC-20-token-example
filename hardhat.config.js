require("@nomiclabs/hardhat-waffle");

require('solidity-coverage');

require("@nomiclabs/hardhat-ethers");

require('dotenv').config();

require("@nomiclabs/hardhat-etherscan");

require ("./tasks/transfer.js");

require ("./tasks/transferFrom.js");

require ("./tasks/approve.js");

require ("./tasks/mint.js");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const { RINKEBY_API_URL, ROPSTEN_API_URL, GOERLI_API_URL, PRIVATE_KEY, ETHERSCAN_API,  } = process.env;

module.exports = {
  solidity: "0.8.13",
  networks: {
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [PRIVATE_KEY]
    },
    ropsten: {
      url: ROPSTEN_API_URL,
      accounts: [PRIVATE_KEY]
    },
    goerli: {
      url: GOERLI_API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  plugins: ["solidity-coverage"],
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};