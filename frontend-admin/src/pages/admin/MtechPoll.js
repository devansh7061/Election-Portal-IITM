import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid} from "@chakra-ui/react";
import "./Admin.css";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js";
import { ethers } from "ethers";
import ContractAddresses from "./ContractAddresses.json";
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

function stringToBytes2(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes2 = ethers.utils.hexDataSlice(bytes, 0, 2);
    return bytes2;
}

function RenderMtechPolls() {

    let mtechPolls = []
    let i=0;
    mtechPolls.push(
        {
            "pollCode": "MT",
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
            "abstainedVotes": 400, // SC API
            "rejectedVotes": 400, // SC API
            "totalVotes": 400, // SC API
            "votes": [213, 321, 321, 321, 312, 123, 132, 123], // SC API
            "departmentWise": [ // DB API
            ],
            "hostelWise": [ // DB API
            ],
        },
    );
    

        // DB API departmentWise
    for (i=0; i<mtechPolls.length; i++) {
        let j=0;
        for (j=0; j<DepartmentCodes.length; j++) {
            mtechPolls[i].departmentWise.push(
                {
                    "dept": DepartmentCodes[j],
                    "votes": 200,
                    "totalVoters": 1000,
                },
            )
        }
    }

    // DB API hostelWise
    for (i=0; i<mtechPolls.length; i++) {
        let j=0;
        for (j=0; j<HostelCodes.length; j++) {
            mtechPolls[i].hostelWise.push(
                {
                    "hostelCode": HostelCodes[j][0],
                    "hostelName": HostelCodes[j][1],
                    "votes": 200,
                    "totalVoters": 1000,
                },
            )
        }
    }

    const [myMtechPolls, setMyMtechPolls] = useState([]);

    useEffect(() => {
      async function fetchPolls() {
        let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);

        const ElectionAddress = ContractAddresses.Election;
        const ElectionABI = [
            "function getMtechPollDetails (bytes2) public view returns (uint256[4] memory)",
            "function getMtechPollVotes (bytes2) public view returns (uint256[] memory)",
        ]
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        
        const promises = mtechPolls.map(async (mtechPoll) => {
            const mtechPollDetails = await ElectionContract.getMtechPollDetails(stringToBytes2(mtechPoll.pollCode));
            const abstainedVotes = mtechPollDetails[0]
            const rejectedVotes = mtechPollDetails[1]
            const totalVotes = mtechPollDetails[3]
            const votes = await ElectionContract.getMtechPollVotes(stringToBytes2(mtechPoll.pollCode));
            return {
              ...mtechPoll,
              abstainedVotes: abstainedVotes.toString(),
              rejectedVotes: rejectedVotes.toString(),
              totalVotes: totalVotes.toString(),
              votes: votes.map(x => x.toString())
            };
          });
        const updatedMtechPolls = await Promise.all(promises);
        // Update the state with the value
        setMyMtechPolls(updatedMtechPolls);
      }
  
      fetchPolls();
    }, []);


    const MtechPolls = myMtechPolls.map((mtechPoll) => {
        return (
            <Accordion allowMultiple>
                <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <AccordionItem>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                        <Text as='b' color='gray.500'>{mtechPoll.pollCode}</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
        
                    <HStack spacing='24px'>
                    <Stat>
                        <StatLabel>Voter Turnup</StatLabel>
                        <StatNumber>{(mtechPoll.totalVotes / mtechPoll.totalVoters * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{mtechPoll.totalVotes} / {mtechPoll.totalVoters}</StatHelpText>
                        <StatHelpText></StatHelpText>
                    </Stat>
                        <Stat>
                        <StatLabel>Abstain votes</StatLabel>
                        <StatNumber>{(mtechPoll.abstainedVotes / mtechPoll.totalVotes * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{mtechPoll.abstainedVotes} / {mtechPoll.totalVotes}</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Reject votes</StatLabel>
                        <StatNumber>{(mtechPoll.rejectedVotes / mtechPoll.totalVotes * 100).toFixed(2)} %</StatNumber>
                        <StatHelpText>{mtechPoll.rejectedVotes} / {mtechPoll.totalVotes}</StatHelpText>
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
                                    mtechPoll.candidates.map((candidate) => {
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
                                (findOccurrences(mtechPoll.votes)).map((preference) => {
                                    return <>
                                        <Th> {preference.pref} </Th>
                                    </>
                                })
                            }
                            </Tr>
                            </Thead>
                            <Tr>
                            {
                                findOccurrences(mtechPoll.votes).map((preference) => {
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
                            mtechPoll.departmentWise.map(function(department) {
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
                            mtechPoll.hostelWise.map(function(hostel) {
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
            {MtechPolls}
        </div>
    )
}

function MtechPolls() {
    return <>
        <RenderMtechPolls />
    </>        
}

export default MtechPolls;

