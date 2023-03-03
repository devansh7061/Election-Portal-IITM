import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid} from "@chakra-ui/react";
import "./Admin.css";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js";
import { ethers } from 'ethers';
import * as fs from "fs";
import ContractAddresses from "./ContractAddresses.json";

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

// rendering the preferential votes as objects
const findOccurrences = (arr = []) => {
   const res = [];
   arr.forEach(el => {
      const index = res.findIndex(obj => {
         return obj['pref'] === el;
      });
      if(index === -1){
         res.push({
            "pref": el,
            "count": 1
         })
      }
      else{
         res[index]["count"]++;
      };
   });
   return res;
};

function RenderCentralPolls() {

    let centralPolls = []
    let i=0;
    for (i=0; i<CentralPollCodes.length; i++) {
        centralPolls.push(
            {
                "pollCode": CentralPollCodes[i][0],
                "pollName": CentralPollCodes[i][1],
                "totalVoters": 5000, // DB API
                "candidates": [ // DB API
                    {
                        "name": "Anirudh",
                        "rollNo": "NA20B007",
                        "candidateNo": 1,
                        
                    },
                    {
                        "name": "Devansh",
                        "rollNo": "NA20B016",
                        "candidateNo": 2,
                        
                    },
                    {
                        "name": "Devansh",
                        "rollNo": "NA20B016",
                        "candidateNo": 3,
                        
                    },
                ],
                "abstainedVotes": 0, // SC API
                "rejectedVotes": 0, // SC API
                "totalVotes": 0, // SC API
                "votes": [], // SC API
                "departmentWise": [ // DB API
                ],
                "hostelWise": [ // DB API
                ],
            },
        );
    }

        // DB API departmentWise
    for (i=0; i<centralPolls.length; i++) {
        let j=0;
        for (j=0; j<DepartmentCodes.length; j++) {
            centralPolls[i].departmentWise.push(
                {
                    "dept": DepartmentCodes[j],
                    "votes": 200,
                    "totalVoters": 1000,
                },
            )
        }
    }

    // DB API hostelWise
    for (i=0; i<centralPolls.length; i++) {
        let j=0;
        for (j=0; j<HostelCodes.length; j++) {
            centralPolls[i].hostelWise.push(
                {
                    "hostelCode": HostelCodes[j][0],
                    "hostelName": HostelCodes[j][1],
                    "votes": 200,
                    "totalVoters": 1000,
                },
            )
        }
    }

    const [myCentralPolls, setMyCentralPolls] = useState([]);

    useEffect(() => {
      async function fetchPolls() {
        let provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
        let adminPrivateKey = "0xa251fb9b543b8c2bf046546b7960529832c19c8581734807b66e0221c01b0a02";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);

        const ElectionAddress = ContractAddresses.Election;
        const ElectionABI = [
            "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
            "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
        ]
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        
        const promises = centralPolls.map(async (centralPoll) => {
            const centralPollDetails = await ElectionContract.getCentralPollDetails(stringToBytes2(centralPoll.pollCode));
            const abstainedVotes = centralPollDetails[0]
            const rejectedVotes = centralPollDetails[1]
            const totalVotes = centralPollDetails[3]
            const votes = await ElectionContract.getCentralPollVotes(stringToBytes2(centralPoll.pollCode));
            return {
              ...centralPoll,
              abstainedVotes: abstainedVotes.toString(),
              rejectedVotes: rejectedVotes.toString(),
              totalVotes: totalVotes.toString(),
              votes: votes.map(x => x.toString())
            };
          });
        const updatedCentralPolls = await Promise.all(promises);
        // Update the state with the value
        setMyCentralPolls(updatedCentralPolls);
      }
  
      fetchPolls();
    }, []);

    const CentralPolls = myCentralPolls.map((centralPoll) => {
        return (
            <Accordion allowMultiple>
                <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <AccordionItem>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                        <Text as='b' color='gray.500'>{centralPoll.pollName} - {centralPoll.pollCode}</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
        
                    <HStack spacing='24px'>
                    <Stat>
                        <StatLabel>Voter Turnup</StatLabel>
                        <StatNumber>{(centralPoll.totalVotes / centralPoll.totalVoters * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{centralPoll.totalVotes} / {centralPoll.totalVoters}</StatHelpText>
                        <StatHelpText></StatHelpText>
                    </Stat>
                        <Stat>
                        <StatLabel>Abstain votes</StatLabel>
                        <StatNumber>{(centralPoll.abstainedVotes / centralPoll.totalVotes * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{centralPoll.abstainedVotes} / {centralPoll.totalVotes}</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Reject votes</StatLabel>
                        <StatNumber>{(centralPoll.rejectedVotes / centralPoll.totalVotes * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{centralPoll.rejectedVotes} / {centralPoll.totalVotes}</StatHelpText>
                    </Stat>
                    </HStack>
        
                    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <TableContainer>
                            <Table variant='simple'>
                            <TableCaption placement="top">Candidates</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th> Name </Th>
                                        <Th> Roll No. </Th>
                                        <Th> Candidate No. </Th>
                                    </Tr>
                                </Thead>
                                {
                                    centralPoll.candidates.map((candidate) => {
                                        return ( <>
                                        <Tr>
                                        <Td> {candidate.name} </Td>
                                            <Td> {candidate.rollNo} </Td>
                                            <Td> {candidate.candidateNo} </Td>
                                        </Tr>
                                        </>
                                        )
                                    })
                                } 
                                <Tfoot>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
        
                    <Box borderWidth='1px' borderRadius='lg' align='center' overflow='hidden'>
                        <TableContainer>
                        <Table variant='simple'>
                        <TableCaption placement="top">Preferences</TableCaption>
                            <Thead>
                            <Tr>
                            {
                                (findOccurrences(centralPoll.votes)).map((preference) => {
                                    return <>
                                        <Th> {preference.pref} </Th>
                                    </>
                                })
                            }
                            </Tr>
                            </Thead>
                            <Tr>
                            {
                                findOccurrences(centralPoll.votes).map((preference) => {
                                    return <>
                                        <Td> {preference.count} </Td>
                                    </>
                                })
                            }
                            </Tr>
                            <Tfoot>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    </Box>
        
                    <Box borderWidth='1px' borderRadius='lg' align='center' overflow='hidden'>
                        <Spacer/>
                        <Text color='gray.500' fontSize='sm' as='b'>Department-wise performance</Text>
                        <SimpleGrid minChildWidth='200px' spacing='50px'>
                        {
                            centralPoll.departmentWise.map(function(department) {
                                return <>
                                    <Stat>
                                        <StatLabel> {department.dept}</StatLabel>
                                        <StatNumber>{(department.votes / department.totalVoters * 100).toFixed(2)} %</StatNumber>
                                        <StatHelpText> {department.votes} / {department.totalVoters} </StatHelpText>
                                    </Stat>
                                </>
                            })
                        }
                        </SimpleGrid>
                    </Box>
        
                    <Box borderWidth='1px' borderRadius='lg' align='center' overflow='hidden'>
                        <Spacer/>
                        <Text color='gray.500' fontSize='sm' as='b'>Hostel-wise performance</Text>
                        <SimpleGrid minChildWidth='200px' spacing='50px'>
                        {
                            centralPoll.hostelWise.map(function(hostel) {
                                return <>
                                    <Stat>
                                        <StatLabel> {hostel.hostelCode} - {hostel.hostelName} </StatLabel>
                                        <StatNumber>{(hostel.votes / hostel.totalVoters * 100).toFixed(2)} %</StatNumber>
                                        <StatHelpText> {hostel.votes} / {hostel.totalVoters} </StatHelpText>
                                    </Stat>
                                </>
                            })
                        }
                        </SimpleGrid>
                    </Box>

                    </AccordionPanel>
                </AccordionItem>
                </Box>
                </Accordion>
                
            )
        }
    )
    return (
        <div>
            {CentralPolls}
        </div>
    )
}

function CentralPolls() {
    return <>
        <RenderCentralPolls />
    </>        
}



export default CentralPolls;

