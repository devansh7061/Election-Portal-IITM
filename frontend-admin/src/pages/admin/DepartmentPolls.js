import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js"
import { ethers } from "ethers";
import ContractAddresses from "./ContractAddresses.json";

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

 function stringToBytes4(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes4 = ethers.utils.hexDataSlice(bytes, 0, 4);
    return bytes4;
}

 
 function RenderDepartmentPolls() {

    let departmentPolls = [];

    let i=0, j=0, k=0;
    for (i=0; i<DepartmentCodes.length; i++) {
        departmentPolls.push(
            {
                "departmentCode": DepartmentCodes[i],
                "polls": []
            }
        )
    }

    for (i=0; i<departmentPolls.length; i++) {
        for (j=0; j<DepartmentPollCodes.length; j++) {
            var values = {
                "departmentPollCode": DepartmentCodes[i] + ' - ' + DepartmentPollCodes[j],
                "totalVoters": 1000,
                "candidates": [
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
                "abstainedVotes": 500,
                "rejectedVotes": 30,
                "totalVotes": 300,
                "votes": [312, 321, 321, 321, 123, 123, 132, 132, 213, 213, 231, 231, 231, 312, 321, 321],
                "hostelWise": [
                ],
                } 
            departmentPolls[i].polls.push(values);
            }
        }
    // DB API hostelWise
    for (i=0; i<departmentPolls.length; i++){
        for (j=0; j<departmentPolls[i].polls.length; j++){
            for (k=0; k<HostelCodes.length; k++){
                departmentPolls[i].polls[j].hostelWise.push(
                    {
                        "hostelCode": HostelCodes[k][0],
                        "hostelName": HostelCodes[k][1],
                        "votes": 200,
                        "totalVoters": 1000,
                    },  
                )
            }            
        }
    }

    const [myDepartmentPolls, setMyDepartmentPolls] = useState([]);

    useEffect(() => {
        let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/f235d9fd779240a79b91330a917cdd7c")
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);

        const ElectionAddress = ContractAddresses.Election;
        const ElectionABI = [
            "function getDepartmentPollDetails (bytes4) public view returns (uint256[4] memory)",
            "function getDepartmentPollVotes (bytes4) public view returns (uint256[] memory)",
        ]
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        const updatedDepartmentPolls = async () => {
        const updatedDepartments = await Promise.all(
            departmentPolls.map(async (departmentPoll) => {
            const updatedPolls = await Promise.all(
                departmentPoll.polls.map(async (poll) => {
                    // Call ethers view function and update signup properties
                    const pollDetails = await ElectionContract.getDepartmentPollDetails(stringToBytes4(poll.departmentPollCode));
                    const abstainedVotes = pollDetails[0]
                    const rejectedVotes = pollDetails[1]
                    const totalVotes = pollDetails[3]
                    const votes = await ElectionContract.getDepartmentPollVotes(stringToBytes4(poll.departmentPollCode));
                    return {
                    ...poll,
                    abstainedVotes: abstainedVotes.toString(),
                    rejectedVotes: rejectedVotes.toString(),
                    totalVotes: totalVotes.toString(),
                    votes: votes.map(x => x.toString())
                };
                })
            );
            return { ...departmentPoll, polls: updatedPolls };
            })
        );
        setMyDepartmentPolls(updatedDepartments);
        };

        updatedDepartmentPolls();
    }, []);

    const DepartmentPolls = myDepartmentPolls.map((departmentPoll) => {
        return (
            <>
            <Tabs isFitted variant='line' colorScheme='black'>
              <TabList>
                <Tab>{departmentPoll.departmentCode}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                {departmentPoll.polls.map((poll) => {
                        return (
                          <Accordion allowMultiple>
                              <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                              <AccordionItem>
                                  <h2>
                                  <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                                      <Box as="span" flex='1' textAlign='left'>
                                      <Text as='b' color='gray.500'>{poll.departmentPollCode}</Text>
                                      </Box>
                                      <AccordionIcon />
                                  </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
  
                                  <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                      <HStack spacing='24px'>
                                          <Stat>
                                              <StatLabel>Voter Turnup</StatLabel>
                                              <StatNumber>{(poll.totalVotes / poll.totalVoters * 100).toFixed(2)} %</StatNumber>
                                              <StatHelpText>{poll.totalVotes} / {poll.totalVoters}</StatHelpText>
                                              <StatHelpText></StatHelpText>
                                          </Stat>
                                              <Stat>
                                              <StatLabel>Abstain votes</StatLabel>
                                              <StatNumber>{(poll.abstainedVotes / poll.totalVotes * 100).toFixed(2)} %</StatNumber>
                                              <StatHelpText>{poll.abstainedVotes} / {poll.totalVotes}</StatHelpText>
                                          </Stat>
                                          <Stat>
                                              <StatLabel>Reject votes</StatLabel>
                                              <StatNumber>{(poll.rejectedVotes / poll.totalVotes * 100).toFixed(2)} %</StatNumber>
                                              <StatHelpText>{poll.rejectedVotes} / {poll.totalVotes}</StatHelpText>
                                          </Stat>
                                      </HStack>
                                  </Box>
  
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
                                                  poll.candidates.map((candidate) => {
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
                                              (findOccurrences(poll.votes)).map((preference) => {
                                                  return <>
                                                      <Th> {preference.pref} </Th>
                                                  </>
                                              })
                                          }
                                          </Tr>
                                          </Thead>
                                          <Tr>
                                          {
                                              findOccurrences(poll.votes).map((preference) => {
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
                                      <Text color='gray.500' fontSize='sm' as='b'>Hostel-wise performance</Text>
                                      <SimpleGrid minChildWidth='200px' spacing='50px'>
                                      {
                                          poll.hostelWise.map(function(hostel) {
                                              return <>
                                                  <Stat>
                                                      <StatLabel> {hostel.hostelCode} - {hostel.hostelName}</StatLabel>
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
                       )}
                       )}
                </TabPanel>
              </TabPanels>
            </Tabs>
            </>
          )
    })

    return (
        <div>
            {DepartmentPolls}
        </div>
    )
}

function DepartmentPolls() {
    return <>
        <RenderDepartmentPolls />
    </>        
}

export default DepartmentPolls;