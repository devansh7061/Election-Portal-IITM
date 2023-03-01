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

let contractAddresses = JSON.parse(fs.readFileSync('ContractAddresses.json'));
let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
let provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c`)
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
const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)

module.exports = {
    viewCentralPollVotes: async function (centralPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const centralPollVotes = await ElectionContract.getCentralPollVotes(stringToBytes2(centralPollCode));
            return(centralPollVotes).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewCentralPollDetails: async function (centralPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const centralPollDetails = await ElectionContract.getCentralPollDetails(stringToBytes2(centralPollCode));
            return(centralPollDetails).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewHostelPollVotes: async function (hostelPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const hostelPollVotes = await ElectionContract.getHostelPollVotes(stringToBytes4(hostelPollCode));
            return(hostelPollVotes).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewHostelPollDetails: async function (hostelPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const hostelPollDetails = await ElectionContract.getHostelPollDetails(stringToBytes4(hostelPollCode));
            return(hostelPollDetails).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewDepartmentPollVotes: async function (departmentPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const departmentPollVotes = await ElectionContract.getDepartmentPollVotes(stringToBytes4(departmentPollCode));
            return(departmentPollVotes).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewDepartmentPollDetails: async function (departmentPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const departmentPollDetails = await ElectionContract.getDepartmentPollDetails(stringToBytes4(departmentPollCode));
            return(departmentPollDetails).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewMtechPollVotes: async function (mtechPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const mtechPollVotes = await ElectionContract.getMtechPollVotes(stringToBytes2(mtechPollCode));
            return(mtechPollVotes).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
    viewMtechPollDetails: async function (mtechPollCode) {
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        try {
            const mtechPollDetails = await ElectionContract.getMtechPollDetails(stringToBytes2(mtechPollCode));
            return(mtechPollDetails).map(x => x.toNumber())
            
        } catch (error) {
            console.error(error);
            process.exitCode = 1;
        }
    },
}
