// Import required packages
const express = require('express');
const router = express.Router();
const { ethers } = require("ethers");
const fs = require("fs");
const { AddrMap } = require("./AddrMap.json");
const contractAddresses = require("./ContractAddresses.json")

let INFURA_ID = 'f235d9fd779240a79b91330a917cdd7c';
let provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
let gasLimit = 2500000;

const ElectionAddress = contractAddresses["Election"];
const ElectionABI = [
    "function addNode(address) public",
    "function startElection() public", "function endElection() public",
    "function viewNodes() public view returns (address[])",
    "function viewElectionStarted() public view returns (bool)",
    "function viewElectionEnded() public view returns (bool)",
    "function viewNodeExists(address) public view returns (bool)",
    "function addVote(bytes32[]) public",
    "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
    "function getHostelPollDetails (bytes4) public view returns (uint256[4] memory)",
    "function getDepartmentPollDetails (bytes4) public view returns (uint256[4] memory)",
    "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
    "function getHostelPollVotes (bytes4) public view returns (uint256[] memory)",
    "function getDepartmentPollVotes (bytes2) public view returns (uint256[] memory)"
]
let ElectionInterface = new ethers.utils.Interface(ElectionABI);

// Define a POST route that receives an object 'ballot' in the request body
router.post('/api/ballots', async (req, res) => {
  
  const ballotObject = req.body;
  // Do something with the object
  console.log('Received strings:', ballotObject);

  // send the ballot transaction
  let gasPrice= await provider.getGasPrice();
  let nodePrivateKey = AddrMap.get(ballotObject.userId);
  let nodeWallet = new ethers.Wallet(nodePrivateKey, provider);
  try {
      nonce = await provider.getTransactionCount(nodeWallet.address);
      let addVoteArr = []
      let i=0;
      for (i=0; i<ballotObject.votes.length; i++) {
          addVoteArr.push(ethers.utils.formatBytes32String(ballotObject.votes[i]))
      }
      const addVoteData = ElectionInterface.encodeFunctionData("addVote", [addVoteArr])
      const addVoteTx = {
          to: ElectionAddress,
          nonce: nonce,
          gasPrice: gasPrice,
          gasLimit: gasLimit,
          data: addVoteData,
          chainId: 80001
      }

      let addVoteSentTx = await nodeWallet.sendTransaction(addVoteTx);
      await addVoteSentTx.wait(1);
      console.log(addVoteSentTx, "\n");
      const receipt = await provider.waitForTransaction(addVoteSentTx.hash);
      if (receipt.status === 1) {
        // Send a response back to the client
        res.status(200).json({ message: receipt.status.toString()});
        console.log("Vote has been recorded !!")
      } else {
        res.status(400).json({ message: receipt.status.toString()})
        console.log("Vote wasn't recorded. Try again")
      }
  } catch (error) {
      console.error(error);
      process.exitCode = 1;
  }
});

module.exports = router;