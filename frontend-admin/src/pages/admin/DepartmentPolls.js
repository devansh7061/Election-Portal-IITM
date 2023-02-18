import React from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import { CentralPollCodes, HostelCodes, HostelPollCodes, DepartmentCodes, DepartmentPollCodes} from "./electionData.js"

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

    const DepartmentPolls = departmentPolls.map((departmentPoll) => {
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