import React from "react";
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
function oneCandidateCard({ name, rollNo, picture }) {
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={picture}
            alt={name }
            borderRadius="lg"
          />
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

export default oneCandidateCard;
