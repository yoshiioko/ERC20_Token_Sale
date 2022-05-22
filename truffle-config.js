const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMastAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "http://127.0.0.1:8545",
          MetaMastAccountIndex
        );
      },
      network_id: 5777,
    },
    rinkeby_infura: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://rinkeby.infura.io/v3/fb967a8f7ca84aa4b6c99cffd33b55a5",
          MetaMastAccountIndex
        );
      },
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: "^0.6.0",
    },
  },
};
