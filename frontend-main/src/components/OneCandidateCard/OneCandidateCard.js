import React, {useState} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import "./OneCandidateCard.css";


function handleClick(e, { active, setActive, setVariable, variable, index }) {
  e.preventDefault();
  setActive(!active);
  if (variable==null || variable =="Abstain" || variable=="Reject") {
    let order = [{ preference: 1, candidate: index }];
    setVariable(order);
  } else {
    setVariable(null);
  }
}
function OneCandidateCard({ name, rollNo, picture, setVariable, variable, index }) {
  const [active, setActive] = useState(false);
  console.log(variable);
  return (
    <div className={(variable==null || variable=="Abstain" || variable=="Reject") ? "" : "active"}>
      <Card
        maxW="sm"
        onClick={(e) =>
          handleClick(e, { active, setActive, variable, setVariable, index })
        }
        variant={variable == index ? "filled" : "outline"}
      >
        <CardBody>
          <Image src={picture} alt={name} borderRadius="lg" boxSize="200px" />
          <Stack mt="6" spacing="3">
            <Center>
              <Heading size="md">{name}</Heading>
            </Center>
            <Center>
              <Heading size="sm">{rollNo}</Heading>
            </Center>
          </Stack>
        </CardBody>
        {/* <Divider />
        <Center>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Select
            </Button>
          </CardFooter>
        </Center> */}
      </Card>
    </div>
  );
}

export default OneCandidateCard;
