import React from "react";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js"
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import "./Admin.css";

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
 
 function RenderHostelPolls() {


    let hostelPolls = [];

    let i=0, j=0, k=0;
    for (i=0; i<HostelCodes.length; i++) {
        hostelPolls.push(
            {
                "hostelCode": HostelCodes[i][0],
                "hostelName": HostelCodes[i][1],
                "polls": []
            }
        )
    }

    for (i=0; i<hostelPolls.length; i++) {
        for (j=0; j<HostelPollCodes.length; j++) {
            var values = {
                "hostelPollCode": HostelCodes[i][0] + HostelPollCodes[j][0],
                "hostelPollName": HostelCodes[i][1] + ' ' + HostelPollCodes[j][1],
                "totalVoters": 5000,
                "candidates": [
                    {
                        "name": "Anirudh",
                        "rollNo": "NA20B007",
                        "candidateNo": 1,
                        "program": "B.tech-20",
                        "dept": "OE",
                        "hostel": "Tapti"
                    },
                    {
                        "name": "Devansh",
                        "rollNo": "NA20B016",
                        "candidateNo": 2,
                        "program": "B.tech-20",
                        "dept": "OE",
                        "hostel": "Tapti"
                    },
                    {
                        "name": "Devansh",
                        "rollNo": "NA20B016",
                        "candidateNo": 3,
                        "program": "B.tech-20",
                        "dept": "OE",
                        "hostel": "Tapti"
                    },
                ],
                "abstainedVotes": 200,
                "rejectedVotes": 300,
                "totalVotes": 3000,
                "votes": [312, 321, 321, 321, 123, 123, 132, 132, 213, 213, 231],
                "departmentWise": [
                ],
                } 
            hostelPolls[i].polls.push(values);
            }
        }
    // DB API departmentWise
    for (i=0; i<hostelPolls.length; i++){
        for (j=0; j<hostelPolls[i].polls.length; j++){
            for (k=0; k<DepartmentCodes.length; k++){
                hostelPolls[i].polls[j].departmentWise.push(
                    {
                        "dept": DepartmentCodes[k],
                        "votes": 200,
                        "totalVoters": 1000,
                    },  
                )
            }            
        }
    }
     
     const HostelPolls = hostelPolls.map((hostelPoll) => {
         return (
            <Tabs isFitted variant='line' colorScheme='black'>
            <TabList>
              <Tab>{hostelPoll.hostelName}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              {hostelPoll.polls.map((poll) => {
                      return (
                        <Accordion allowMultiple>
                            <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                            <AccordionItem>
                                <h2>
                                <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='left'>
                                    <Text as='b' color='gray.500'>{poll.hostelPollName} - {poll.hostelPollCode}</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>

                                <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                    <Text as='b'>{poll.hostelPollName}</Text>
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
                                                    <Th> Program </Th>
                                                    <Th> Department </Th>
                                                    <Th> Hostel </Th>
                                                </Tr>
                                            </Thead>
                                            {
                                                poll.candidates.map((candidate) => {
                                                    return ( <>
                                                    <Tr>
                                                        <Td> {candidate.name} </Td>
                                                        <Td> {candidate.rollNo} </Td>
                                                        <Td> {candidate.candidateNo} </Td>
                                                        <Td> {candidate.program} </Td>
                                                        <Td> {candidate.dept} </Td>
                                                        <Td> {candidate.hostel} </Td>
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
                                    <Text color='gray.500' fontSize='sm' as='b'>Department-wise performance</Text>
                                    <SimpleGrid minChildWidth='200px' spacing='50px'>
                                    {
                                        poll.departmentWise.map(function(department) {
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

                                </AccordionPanel>
                            </AccordionItem>
                            </Box>
                            </Accordion>
                     )}
                     )}
              </TabPanel>
            </TabPanels>
          </Tabs>
             )
         }
     )
     return (
         <div>
             {HostelPolls}
         </div>
     )
 }
 
 function HostelPolls() {
     return <>
         <RenderHostelPolls />
     </>        
 }
 
 export default HostelPolls;