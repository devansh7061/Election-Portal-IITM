const { ethers } = require("ethers");
const fs = require("fs");

const main = async () => {

    let contractAddresses = JSON.parse(fs.readFileSync('../ContractAddresses.json'));
    let provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c`)
    let nodePrivateKey = "0x25a1335874be70669269b861e513a212b1633db72a7c1400870aa27dfbbc1dc8";
    let nodeWallet = new ethers.Wallet(nodePrivateKey, provider);
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
    const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, nodeWallet)
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
    const PreElectionContract = new ethers.Contract(PreElectionAddress, PreElectionABI, nodeWallet);

    // Trial for adding votes

    // transaction for addVote function
    nonce = await provider.getTransactionCount(nodeWallet.address);
    let addVoteData = ElectionInterface.encodeFunctionData("addVote", [[ethers.utils.formatBytes32String("1AA10000"), ethers.utils.formatBytes32String("2AKHH00312")]]);

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

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });