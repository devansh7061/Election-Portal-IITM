const { ethers } = require("ethers");
const fs = require("fs");

let contractAddresses = JSON.parse(fs.readFileSync('ContractAddresses.json'));
let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
// let provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.blockpi.network/v1/rpc/public")
let gasLimit = 2500000;

const AddrMap = new Map([
    ["user1", "25a1335874be70669269b861e513a212b1633db72a7c1400870aa27dfbbc1dc8"],
    ["user2", "2bd059a268ccfe26f72fef86ecbefc55ee592ad7297af389b0be9a5b911f45d2"]
])

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

module.exports = {
    addVote: async function (ballotObject) {
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
    
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    }
}