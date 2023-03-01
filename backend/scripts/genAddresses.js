const ethers = require('ethers');
const fs = require('fs');

// number of private keys to generate
const numKeys = 170;

// generate private keys and map to serial numbers
const keys = {};
const addresses = {};
for (let i = 1; i <= numKeys; i++) {
  const wallet = ethers.Wallet.createRandom();
  keys[`user`+(i).toString()] = wallet.privateKey;
  addresses[`user`+(i).toString()] = wallet.address;
}
console.log(keys)

// write keys to a JSON file
fs.writeFile('./scripts/AddrMap.json', JSON.stringify(keys), err => {
  if (err) throw err;
  console.log(`Successfully wrote ${numKeys} keys to AddrMap.json`);
});

fs.writeFile('./scripts/Addresses.json', JSON.stringify(addresses), err => {
  if (err) throw err;
  console.log(`Successfully wrote ${numKeys} keys to AddrMap.json`);
});