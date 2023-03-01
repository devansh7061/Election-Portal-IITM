const {ethers} = require("ethers");
const fs = require('fs');

/* for frontend, use:
import { ethers } from 'ethers';
import InElectionArtifact from '../artifacts/contracts/in_election.sol';
 */




const main = async () => {

    let contractAddresses = JSON.parse(fs.readFileSync('./ContractAddresses.json'));
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

    /// Trial for adding admins

    // transaction for addNode function
    let nonce = await provider.getTransactionCount(adminWallet.address);
    let ElectionInterface = new ethers.utils.Interface(ElectionABI);
    let addNodeTxData = ElectionInterface.encodeFunctionData("addNode", ["0x88d52cb7747D01977B3409Cb255Fc102C3b6ce3F"])
    const addNodeTx = {
        to: ElectionAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: addNodeTxData,
        chainId: 80001
    }
    let addNodeSentTx = await adminWallet.sendTransaction(addNodeTx);
    await addNodeSentTx.wait(1);
    console.log(addNodeSentTx, "\n");

    // view function for verification

    const Nodes = await ElectionContract.viewNodes();
    console.log(Nodes, "\n\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  // 0x9024c6352F9C4273CFb07C6fc2Dd423ded165Ea6
  // 0x5771dB912532BF69dCB752E527f981B9ec324137