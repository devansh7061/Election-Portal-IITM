// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const fsExtra = require('fs-extra');
const {ethers} = require("ethers")

let contractAddresses = {};

async function main() {
  
  // The issue with ethers or truffle is that they don not create new artifact files everytime
  // the contract is compiled, and hence sometime the script calls the previous version of the deployment
  // instead of calling the new one. Hence we clean the artifacts folder to freshly compile and deploy
  fsExtra.emptyDirSync("../artifacts/build-info");
  fsExtra.emptyDirSync("../artifacts/contracts");

  nonce = 12345
  const PreElection = await hre.ethers.getContractFactory("PreElection");
  const preElection = await PreElection.deploy({
    nonce: nonce
  });
  await preElection.deployed();

  nonce += 1;
  const AddHostelPollsA = await hre.ethers.getContractFactory("AddHostelPollsA");
  const addHostelPollsA = await AddHostelPollsA.deploy({
    nonce: nonce
  });
  await addHostelPollsA.deployed({
    nonce: nonce
  });

  nonce +=1 
  const AddHostelPollsB = await hre.ethers.getContractFactory("AddHostelPollsB");
  const addHostelPollsB = await AddHostelPollsB.deploy({
    nonce: nonce
  });
  await addHostelPollsB.deployed();

  const AddHostelPollsC = await hre.ethers.getContractFactory("AddHostelPollsC");
  const addHostelPollsC = await AddHostelPollsC.deploy({
    nonce: nonce
  });
  await addHostelPollsC.deployed();

  const AddHostelPollsD = await hre.ethers.getContractFactory("AddHostelPollsD");
  const addHostelPollsD = await AddHostelPollsD.deploy({
    nonce: nonce
  });
  await addHostelPollsD.deployed();

  const AddOtherPolls = await hre.ethers.getContractFactory("AddOtherPolls");
  const addOtherPolls = await AddOtherPolls.deploy({
    nonce: nonce
  });
  await addOtherPolls.deployed();

  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy({
    nonce: nonce
  });
  await election.deployed();


  console.log(
    `\n
    Pre_election deployed at address ${preElection.address} \n 
    AddHostelPollsA deployed at address ${addHostelPollsA.address} \n 
    AddHostelPollsB deployed at address ${addHostelPollsB.address} \n
    AddHostelPollsC deployed at address ${addHostelPollsC.address} \n 
    AddHostelPollsD deployed at address ${addHostelPollsD.address} \n
    AddOtherPolls deployed at address ${addOtherPolls.address} \n
    Election deployed at address ${election.address} \n`
  );
  contractAddresses["PreElection"] = preElection.address;
  contractAddresses["AddHostelPollsA"] = addHostelPollsA.address;
  contractAddresses["AddHostelPollsB"] = addHostelPollsB.address;
  contractAddresses["AddHostelPollsC"] = addHostelPollsC.address;
  contractAddresses["AddHostelPollsD"] = addHostelPollsD.address;
  contractAddresses["AddOtherPolls"] = addOtherPolls.address;
  contractAddresses["Election"] = election.address;

  var ContractAddresses = JSON.stringify(contractAddresses);
  fs.writeFileSync("./scripts/ContractAddresses.json", ContractAddresses);
  fs.writeFileSync('../frontend-admin/src/pages/admin/ContractAddresses.json', ContractAddresses)
  console.log(contractAddresses)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});