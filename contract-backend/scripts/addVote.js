const { ethers } = require("ethers");
const fs = require("fs");
import { AddrMap } from "./AddrMap.js"

let contractAddresses = JSON.parse(fs.readFileSync('../../frontend-admin/ContractAddresses.json'));
let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
let provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
let gasPrice= await provider.getGasPrice();
let gasLimit = 2500000;

const ElectionAddress = contractAddresses["Election"];
const ElectionABI = ["function addVote(bytes32[] calldata) public onlyNode electionStarted", 
    "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
    "function getHostelPollDetails (bytes4) public view returns (uint256[4] memory)",
    "function getDepartmentPollDetails (bytes4) public view returns (uint256[4] memory)",
    "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
    "function getHostelPollVotes (bytes4) public view returns (uint256[] memory)",
    "function getDepartmentPollVotes (bytes2) public view returns (uint256[] memory)"
]
let ElectionInterface = new ethers.utils.Interface(ElectionABI);

const PreElectionAddress = contractAddresses["PreElection"];
const PreElectionABI = [
    "function addNode(address) public",
    "function startElection() public", "function endElection() public",
    "function viewNodes() public view returns (address[])",
    "function viewElectionStarted() public view returns (bool)",
    "function viewElectionEnded() public view returns (bool)",
    "function viewNodeExists(address) public view returns (bool)",
]

async function addVote (ballotObject) {
    let nodePrivateKey = AddrMap.get(ballotObject.userId);
    let nodeWallet = new ethers.Wallet(nodePrivateKey, provider);
    try {
        nonce = await provider.getTransactionCount(nodeWallet.address);
        let addVoteArr = []
        let i=0;
        for (i=0; i<ballotObject.votes.length; i++) {
            addVoteData.push(ethers.utils.formatBytes32String(voteArr[i]))
        }

        const addVoteData = ElectionInterface.encodeFunctionData(addVoteArr)
        const addVoteTx = {
            to: ElectionAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            data: addVoteData,
            chainId: 5
        }

        let addVoteSentTx = await nodeWallet.sendTransaction(addVoteTx);
        await addVoteSentTx.wait(1);
        console.log(addVoteSentTx, "\n");

    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}