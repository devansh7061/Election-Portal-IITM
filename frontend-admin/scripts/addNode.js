const {ethers} = require("ethers");
const fs = require('fs');

/* for frontend, use:
import { ethers } from 'ethers';
import InElectionArtifact from '../artifacts/contracts/in_election.sol';
 */

function stringToBytes2(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes2 = ethers.utils.hexDataSlice(bytes, 0, 2);
    return bytes2;
}

function stringToBytes4(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes4 = ethers.utils.hexDataSlice(bytes, 0, 4);
    return bytes4;
}


const main = async () => {

    let contractAddresses = JSON.parse(fs.readFileSync('../../frontend-admin/ContractAddresses.json'));
    let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
    let provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
    let adminPrivateKey = "0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02";
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
    let PreElectionInterface = new ethers.utils.Interface(PreElectionABI);
    let addNodeTxData = PreElectionInterface.encodeFunctionData("addNode", ["0x9024c6352F9C4273CFb07C6fc2Dd423ded165Ea6"])
    const addNodeTx = {
        to: PreElectionAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: addNodeTxData,
        chainId: 137
    }
    let addNodeSentTx = await adminWallet.sendTransaction(addNodeTx);
    await addNodeSentTx.wait(1);
    console.log(addNodeSentTx, "\n");

    // view function for verification

    const Nodes = await PreElectionContract.viewNodes();
    console.log(Nodes, "\n\n");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  // 0x9024c6352F9C4273CFb07C6fc2Dd423ded165Ea6
  // 0x5771dB912532BF69dCB752E527f981B9ec324137