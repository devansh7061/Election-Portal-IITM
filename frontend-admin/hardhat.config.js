require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.0",

  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/80f66721ab284276b1faeb59e5b83e46",
      chainId: 5,
      accounts: ["0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02"],
      allowUnlimitedContractSize: true
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/80f66721ab284276b1faeb59e5b83e46",
      chainId: 5,
      accounts: ["0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02"],
      allowUnlimitedContractSize: true
    },
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/f235d9fd779240a79b91330a917cdd7c",
      chainId: 137,
      accounts: ["0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02"],
      allowUnlimitedContractSize: true
    },
  },
};
