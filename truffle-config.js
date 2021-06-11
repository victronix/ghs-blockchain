const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = "bone quality negative prevent sell grab bus turn true tail cliff ramp angry bulb private";


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/ecac7249f3e841d6b6d0b2f5d719dd84", 2)
      },
      network_id: 3
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}