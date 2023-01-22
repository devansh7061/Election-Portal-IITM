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
  if (variable == index) {
    setVariable("");
  } else {
    setVariable(index);
  }
}
function OneCandidateCard({ name, rollNo, picture, setVariable, variable, index }) {
  const [active, setActive] = useState(false);
  return (
    <div className={variable == index ? "active" : ""}>
      <Card
        maxW="sm"
        onClick={(e) =>
          handleClick(e, { active, setActive, variable, setVariable, index })
        }
        variant={variable == index ? "filled" : "outline"}
      >
        <CardBody>
          <Image src={picture} alt={name} borderRadius="lg" />
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
