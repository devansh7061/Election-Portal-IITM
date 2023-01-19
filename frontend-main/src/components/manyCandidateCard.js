import React from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Select,
  Heading,
  Center,
} from "@chakra-ui/react";
function manyCandidateCard({ name, rollNo, picture }) {
  return (
    <div>
      <Card maxW="sm">
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
        <Divider />
        <Center>
          <CardFooter>
            <Select variant="filled" placeholder="Select your preference" />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </CardFooter>
        </Center>
      </Card>
    </div>
  );
}

export default manyCandidateCard
