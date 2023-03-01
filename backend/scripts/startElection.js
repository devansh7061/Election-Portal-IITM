const { ethers } = require("ethers");
const fs = require("fs");

const main = async () => {

    let contractAddresses = JSON.parse(fs.readFileSync('ContractAddresses.json'));
    let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
    let provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c`)
    let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
    let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
    let gasPrice= await provider.getGasPrice();
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
    const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
    let ElectionInterface = new ethers.utils.Interface(ElectionABI);

    // transaction for startElection function
    nonce = await provider.getTransactionCount(adminWallet.address);
    let startElectionData = ElectionInterface.encodeFunctionData("startElection");
    
    const startElectionTx = {
        to: ElectionAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: startElectionData,
        chainId: 80001
    }

    let startElectionSentTx = await adminWallet.sendTransaction(startElectionTx);
    await startElectionSentTx.wait(1);
    console.log(startElectionSentTx, "\n");

    const ViewElectionStarted = await ElectionContract.viewElectionStarted();
    console.log(ViewElectionStarted, "\n\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });