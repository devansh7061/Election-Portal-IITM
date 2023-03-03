const ethers = require("ethers")

console.log('[', ethers.utils.formatBytes32String("1AA10000"), ',',
ethers.utils.formatBytes32String("2AKHH00312"), ',',
ethers.utils.formatBytes32String("3EPBT00312"), ',',
ethers.utils.formatBytes32String("4MT10000"), ']');

const seedPhrase = 'arrest coral immense actor increase amazing better noble parade pilot scrub day';

// create an instance of Wallet using the seed phrase
const wallet = ethers.Wallet.fromMnemonic(seedPhrase);

// get the private key
const privateKey = wallet.privateKey;

console.log(privateKey);

// new key: 0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02

// old key: a0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea