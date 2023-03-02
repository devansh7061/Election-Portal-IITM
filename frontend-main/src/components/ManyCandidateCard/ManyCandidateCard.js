import React, {useState, useRef, useEffect} from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Heading,
  Center,
} from "@chakra-ui/react";
import Select from "react-select";

function handleChange(e, { index, variable, setVariable, selectedOption, setSelectedOption }) {
  console.log(index, "abc");
  console.log(e, "abc");
  let order;
  if (e == null) {
    // order = variable.filter((x) => x.preference !== selectedOption);
    // setVariable(order);
    // setSelectedOption(null);
  } else {
    if (variable == null || variable == "Abstain" || variable == "Reject") {
      order = [{ preference: e.value, candidate: index }];
      // console.log(order);
      setVariable(order);
    } else {
      if (e == null) {
        order = variable.filter((x) => x.preference !== selectedOption);
      } else {
        order = [...variable, { preference: e.value, candidate: index }];
      }
      // console.log(order);
      setVariable(order);
    }
    if (e != null) {
      setSelectedOption(e.value);
    } else {
      setSelectedOption(null);
    }
  }
  
}
function ManyCandidateCard({
  name,
  rollNo,
  picture,
  preferences,
  setPreferences,
  variable,
  setVariable,
  index,
}) {
  let updatedPreferences = preferences;
  const [selectedOption, setSelectedOption] = useState(null);
  const voteMap = variable;
  // console.log(voteMap);
  if (variable == null || variable == "Abstain" || variable == "Reject") {
    // console.log("Phatne se pehle", variable);
  } else {
    voteMap.map((item) => {
      updatedPreferences = updatedPreferences.filter((x) => x.value !== item.preference);
      // console.log(updatedPreferences);
    });
  }
  console.log(variable);
  const selectInputRef = useRef();
  const onClear = () => {
    selectInputRef.current.clearValue();
  };
  useEffect(() => {
    if (variable == "Reject" || variable == "Abstain") {
      onClear();
    }
  }, [variable])
  return (
    <div>
      <Card maxW="sm">
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
        <Divider />
        <Center>
          <CardFooter>
            <Select
              variant="filled"
              placeholder="Select your preference"
              onChange={(e) =>
                handleChange(e, {
                  index,
                  variable,
                  setVariable,
                  selectedOption,
                  setSelectedOption,
                })
              }
              options={updatedPreferences}
              isClearable={true}
              ref={selectInputRef}
            />
          </CardFooter>
        </Center>
      </Card>
    </div>
  );
}

export default ManyCandidateCard;
