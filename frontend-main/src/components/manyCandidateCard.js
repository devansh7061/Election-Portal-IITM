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
} from "@chakra-ui/react"
function ManyCandidateCard({ name, rollNo, picture, preferences}) {
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
            <Select
              variant="filled"
              placeholder="Select your preference"
            >
              {preferences.map((preference, i) => {
                return (
                  <option key={i} value={preference}>
                    {preference}
                  </option>
                );
              })}
            </Select>
          </CardFooter>
        </Center>
      </Card>
    </div>
  );
}

export default ManyCandidateCard
