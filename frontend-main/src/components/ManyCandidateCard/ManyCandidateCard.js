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

function handleChange(e, {index, p1, p2, p3, setP1, setP2, setP3}) {
  e.preventDefault();
  if (e.target.value == 1 && p1 != null) {
    setP1(index);
    throw new Error("Two candidates cannot have same preference")
  }
  if (e.target.value == 2 && p2 != null) {
    setP2(index);
    throw new Error("Two candidates cannot have same preference");

  }
  if (e.target.value == 3 && p3 != null) {
    setP3(index);
    throw new Error("Two candidates cannot have same preference");
  }
  if (e.target.value == 1 && p1 == null) {
    setP1(index);
  }
  if (e.target.value == 2 && p2 == null) {
    setP2(index);
  }
  if (e.target.value == 3 && p3 == null) {
    setP3(index);
  }
}
function ManyCandidateCard({ name, rollNo, picture, preferences, index, p1, p2, p3, setP1, setP2, setP3}) {
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
              onChange={(e) => handleChange(e, {index, p1, p2, p3, setP1, setP2, setP3})}
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
