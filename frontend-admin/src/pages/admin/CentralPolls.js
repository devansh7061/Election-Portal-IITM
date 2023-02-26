import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid} from "@chakra-ui/react";
import "./Admin.css";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js";

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

    

    const CentralPolls = centralPolls.map((centralPoll) => {
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
                                        <Th> Program </Th>
                                        <Th> Department </Th>
                                        <Th> Hostel </Th>
                                    </Tr>
                                </Thead>
                                {
                                    centralPoll.candidates.map((candidate) => {
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

