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
function oneCandidateCard({ name, rollNo }) {
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
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
        <Divider />
        <Center>
          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Select
            </Button>
          </CardFooter>
        </Center>
      </Card>
    </div>
  );
}

export default oneCandidateCard;
