import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text , HStack, Center, Card} from "@chakra-ui/react";
import "./Admin.css";
import Navbar from "../admin/Navbar.js";
import { ethers } from 'ethers';
import ContractAddresses from "./ContractAddresses.json"

function StartEnd () {

    const generateResults = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
        }

        const [myStart, setMyStart] = useState()
        const [myEnd, setMyEnd] = useState()
    useEffect(() => {
        async function fetchData() {
          let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
          let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
          let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
  
          const ElectionAddress = ContractAddresses.Election;
          const ElectionABI = [
              "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
              "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
              "function viewNodes() public view returns (address[] _memory)",
              "function viewElectionStarted() public view returns (bool)",
              "function viewElectionEnded() public view returns (bool)",
          ]
          const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
          const start = await ElectionContract.viewElectionStarted()
          const end = await ElectionContract.viewElectionEnded()
          // Update the state with the value
          setMyStart(start);
          setMyEnd(end);
        }
    
        fetchData();
      }, []);
      console.log(myStart)
      console.log(myEnd)

      const handleStart = async () => {
        let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
        let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        let gasPrice= await provider.getGasPrice();
        let gasLimit = 2500000;
        const ElectionABI = [
            "function startElection() public", 
            "function endElection() public",
            "function viewElectionStarted() public view returns (bool)",
            "function viewElectionEnded() public view returns (bool)",
        ]
        const ElectionAddress = ContractAddresses.Election;
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        let ElectionInterface = new ethers.utils.Interface(ElectionABI);
        try {
            let nonce = await provider.getTransactionCount(adminWallet.address);
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
          // You can update the UI here to show that the transaction is being processed
        } catch (err) {
          console.error(err);
          // You can update the UI here to show that there was an error
        }
      };

      const handleEnd = async () => {
        let INFURA_ID = '80f66721ab284276b1faeb59e5b83e46';
        let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        let gasPrice= await provider.getGasPrice();
        let gasLimit = 2500000;
        const ElectionABI = [
            "function startElection() public", 
            "function endElection() public",
            "function viewElectionStarted() public view returns (bool)",
            "function viewElectionEnded() public view returns (bool)",
        ]
        const ElectionAddress = ContractAddresses.Election;
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        let ElectionInterface = new ethers.utils.Interface(ElectionABI);
        try {
            let nonce = await provider.getTransactionCount(adminWallet.address);
            let endElectionData = ElectionInterface.encodeFunctionData("endElection");
            
            const endElectionTx = {
                to: ElectionAddress,
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: endElectionData,
                chainId: 80001
            }
        
            let endElectionSentTx = await adminWallet.sendTransaction(endElectionTx);
            await endElectionSentTx.wait(1);
            console.log(endElectionSentTx, "\n");
        
            const ViewElectionEnded = await ElectionContract.viewElectionEnded();
            console.log(ViewElectionEnded, "\n\n");
          // You can update the UI here to show that the transaction is being processed
        } catch (err) {
          console.error(err);
          // You can update the UI here to show that there was an error
        }
      };

      return (
        <>
        <Navbar />
        <Center h='100px' color='black'>
            <HStack>
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    onClick={handleStart}
                    >
                    Start Election
                    </Button>
                <Spacer />
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    onClick={handleEnd}
                    >
                    End Election
                    </Button>
                <Spacer />
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    onClick={generateResults}
                    >
                    Generate results
                    </Button>
                    <Spacer />
            </HStack>

        </Center>

        <Center>
                <Card>
                    {!myStart && !myEnd &&
                        <Text as='b' fontSize={20}>
                        Election hasn't started yet
                        </Text>
                    }
                    {myStart && !myEnd &&
                        <Text as='b' fontSize={20}>
                        Election is live
                        </Text>
                    }
                    {!myStart && myEnd &&
                        <Text as='b' fontSize={20}>
                        Election has been ended
                        </Text>
                    }
                </Card>
            </Center>
        </>
      )
}

export default StartEnd;