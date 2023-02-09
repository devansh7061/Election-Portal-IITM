import React from "react";
import { Box, Flex, Button, Spacer, Text, HStack, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Stat,StatLabel,StatNumber,StatHelpText,StatArrow, StatGroup, SimpleGrid} from "@chakra-ui/react";
import "./Admin.css";

// rendering the preferential votes as objects
let votes = [312, 321, 321, 321, 123, 123, 132, 132, 213, 213, 231];
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
let renderVotes = findOccurrences(votes);


// rendering candidate list as objects
let candidates = [
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
        "name": "Random",
        "rollNo": "NA20B100",
        "candidateNo": 3,
        "program": "B.tech-20",
        "dept": "OE",
        "hostel": "Tapti"
    },
]

let depts = ["AE","BT","CE","CH","CS","CY","ED","EE","EP","HS","MS","MA","ME","MM","OE","PH","AM"]
let deptObjects = []
let i = 0;
for(i=0;i<depts.length;i++){
    deptObjects.push({dept: depts[i],votes: 200, total:500})
}

let hostelObjects = []
let hostels = [
        ["AK", "Alakananda"],
        ["BH", "Bhadra"],
        ["BR", "Brahmaputra"],
        ["CA", "Cauvery"],
        ["GN", "Ganga"],
        ["GD", "Godavari"],
        ["JM", "Jamuna"],
        ["KR", "Krishna"],
        ["MH", "Mahanadi"],
        ["MA", "Mandakini A"],
        ["NM", "Narmada"],
        ["PM", "Pampa"],
        ["SM", "Sabarmati"],
        ["SS", "Saraswathi"],
        ["SH", "Sharavati"],
        ["SN", "Sindhu"],
        ["TM", "Tamiraparani"],
        ["TP", "Tapti"],
        ["TU", "Tunga"]
]

let hostelObj = {};
for (const [code, name] of hostels) {
    hostelObj = {
        hostelCode: code,
        hostelName: name,
        votes: 150,
        total: 600
    }
    hostelObjects.push(hostelObj)
}
console.log(hostelObjects)



const HostelPolls = () => {
      return (
        <>  
            <Accordion defaultIndex={[0]} allowMultiple>
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <AccordionItem>
                <h2>

                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                    <Text as='b' color='gray.500'>ACADEMIC AFFAIRS</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                </h2>
                <AccordionPanel pb={4}>

                <HStack spacing='24px'>
                <Stat>
                    <StatLabel>Voter Turnup</StatLabel>
                    <StatNumber>{(5000 / 7500 * 100).toFixed(2)} %</StatNumber>
                    <StatHelpText>5000 / 7500</StatHelpText>
                </Stat>
                    <Stat>
                    <StatLabel>Abstain votes</StatLabel>
                    <StatNumber>{(500 / 5000 * 100).toFixed(2)} %</StatNumber>
                    <StatHelpText>500 / 5000</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Reject votes</StatLabel>
                    <StatNumber>{(1000 / 5000 * 100).toFixed(2)} %</StatNumber>
                    <StatHelpText>1000 / 5000</StatHelpText>
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
                                candidates.map((candidate) => {
                                    return <>
                                    <Tr>
                                        <Td> {candidate.name} </Td>
                                        <Td> {candidate.rollNo} </Td>
                                        <Td> {candidate.candidateNo} </Td>
                                        <Td> {candidate.program} </Td>
                                        <Td> {candidate.dept} </Td>
                                        <Td> {candidate.hostel} </Td>
                                    </Tr>
                                    
                                    </>
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
                            renderVotes.map((vote) => {
                                return <>
                                    <Th> {vote.pref} </Th>
                                </>
                            })
                        }
                        </Tr>
                        </Thead>
                        <Tr>
                        {
                            renderVotes.map((vote) => {
                                return <>
                                    <Td> {vote.count} </Td>
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
                        deptObjects.map((dept) => {
                            return <>
                                <Stat>
                                    <StatLabel> {dept.dept} </StatLabel>
                                    <StatNumber>{(dept.votes / dept.total * 100).toFixed(2)} %</StatNumber>
                                    <StatHelpText> {dept.votes} / {dept.total} </StatHelpText>
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
                        hostelObjects.map((hostel) => {
                            return <>
                                <Stat>
                                    <StatLabel> {hostel.hostelCode} - {hostel.hostelName} </StatLabel>
                                    <StatNumber>{(hostel.votes / hostel.total * 100).toFixed(2)} %</StatNumber>
                                    <StatHelpText> {hostel.votes} / {hostel.total} </StatHelpText>
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
        </>
      )
}

export default HostelPolls;

