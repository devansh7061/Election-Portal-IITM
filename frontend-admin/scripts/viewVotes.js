const { ethers } = require("ethers");
const fs = require("fs");

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

let contractAddresses = JSON.parse(fs.readFileSync('../ContractAddresses.json'));
let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
let provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)
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

// view functions for verification

async function getHostelPollVotes (hostelPollCode) {
    const hostelPollVotes = await ElectionContract.getHostelPollVotes(stringToBytes4(hostelPollCode));
    return hostelPollVotes.map(x => x.toNumber())
}

async function getHostelPollDetails (hostelPollCode) {
    const hostelPollDetails = await ElectionContract.getHostelPollDetails(stringToBytes4(hostelPollCode));
    return hostelPollDetails.map(x => x.toNumber());
}

async function getCentralPollVotes (centralPollCode) {
    const centralPollVotes = await ElectionContract.getCentralPollVotes(stringToBytes2(centralPollCode));
    return centralPollVotes.map(x => x.toNumber());
}

const response  = getCentralPollVotes(centralPollCode)

async function getCentralPollDetails (centralPollCode) {
    const centralPollDetails = await ElectionContract.getCentralPollDetails(stringToBytes2(centralPollCode));
    return centralPollDetails.map(x => x.toNumber());
}


// Define the function to run the view function and write the data to a file
async function runAndWriteHostelPollVotes(hostelPollCode) {
    try {
        const filePath = "../pages/admin/viewData.js";
        const hostelPollVotes = await ElectionContract.getHostelPollVotes(stringToBytes4(hostelPollCode));
        // Write the data to the file
        fs.writeFileSync(filePath, `${hostelPollVotes}\n`);
    
        console.log(`View function ${functionName} called successfully. Result: ${result}`);
        } catch (error) {
        console.error(`Error calling view function ${functionName}: ${error}`);
        }
  }

  async function runAndWriteHostelPollDetails(pollCode)
  
  // Set up the interval to run the function every 10 seconds
  setInterval(runAndWrite, 10000);