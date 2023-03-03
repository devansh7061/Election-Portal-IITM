const { ethers } = require("ethers");
const fs = require("fs");

const main = async () => {

    let contractAddresses = JSON.parse(fs.readFileSync('../ContractAddresses.json'));
    let provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/f235d9fd779240a79b91330a917cdd7c`)
    let adminPrivateKey = "0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02";
    let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
    let gasPrice= await provider.getGasPrice();
    let gasLimit = 2500000;

    const ElectionAddress = contractAddresses["Election"];
    const ElectionABI = ["function addVote(bytes32[]) public", 
        "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
        "function getHostelPollDetails (bytes4) public view returns (uint256[4] memory)",
        "function getDepartmentPollDetails (bytes4) public view returns (uint256[4] memory)",
        "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
        "function getHostelPollVotes (bytes4) public view returns (uint256[] memory)",
        "function getDepartmentPollVotes (bytes2) public view returns (uint256[] memory)"
    ]
    const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
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
    const PreElectionContract = new ethers.Contract(PreElectionAddress, PreElectionABI, adminWallet);
    let PreElectionInterface = new ethers.utils.Interface(PreElectionABI);

    // transaction for startElection function
    nonce = await provider.getTransactionCount(adminWallet.address);
    let startElectionData = PreElectionInterface.encodeFunctionData("startElection");
    
    const startElectionTx = {
        to: PreElectionAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: startElectionData,
        chainId: 137
    }

    let startElectionSentTx = await adminWallet.sendTransaction(startElectionTx);
    await startElectionSentTx.wait(1);
    console.log(startElectionSentTx, "\n");

    const ViewElectionStarted = await PreElectionContract.viewElectionStarted();
    console.log(ViewElectionStarted, "\n\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });