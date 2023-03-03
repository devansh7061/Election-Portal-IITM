const fs = require('fs');
const { ethers } = require('ethers');

// Read the JSON file containing the map of userId to addresses
const fileContents = fs.readFileSync('Addresses.json');
const userIdToAddressMap = JSON.parse(fileContents);

// Specify the provider and signer for sending transactions
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/f235d9fd779240a79b91330a917cdd7c');
const privateKey = '0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02';
const signer = new ethers.Wallet(privateKey, provider);

// Specify the amount of ether to send to each address
const amountToSend = ethers.utils.parseEther('1');

// Iterate through the userId to address map and send ether to each address
for (const userId in userIdToAddressMap) {
  const address = userIdToAddressMap[userId];

  // Send the transaction and wait for confirmation
  const tx = await signer.sendTransaction({
    to: address,
    value: amountToSend
  });
  await tx.wait();

  console.log(`Sent ${ethers.utils.formatEther(amountToSend)} ETH to address ${address} for user ${userId}`);
}
