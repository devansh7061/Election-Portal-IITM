import React, {useState} from 'react'
import {
  Card,
  CardBody,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import "./Abstain.css";
import AbstainImage from "./Abstain.png"

function handleClick(e, { active, setActive, variable, setVariable, onOpen }) {
  e.preventDefault();
  setActive(!active);
  console.log("Abstain variable", variable);
  if (variable == "Abstain") {
    setVariable(null);
  } else if(variable == "Reject" || variable == null) {
    setVariable("Abstain");
  } else {
    if (variable.length > 1) {
      onOpen();
    }
    setVariable("Abstain")
  }
}

function Abstain({ variable, setVariable }) {
  const [active, setActive] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className={variable == "Abstain" ? "active" : "inactive"}>
        <Image
          src={AbstainImage}
          alt="Abstain"
          borderRadius="lg"
          boxSize="250px"
          onClick={(e) =>
            handleClick(e, { active, setActive, variable, setVariable, onOpen })
          }
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You have already selected a preference, selecting this option will lead your vote to be counted as Abstained 
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Abstain
