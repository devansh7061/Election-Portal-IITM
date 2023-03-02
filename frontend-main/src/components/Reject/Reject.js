import React, { useState } from "react";
import { Card, CardBody, Image, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure } from "@chakra-ui/react";
import "./Reject.css";
import RejectImage from "./Reject.png";

function handleClick(e, { active, setActive, setVariable, variable, onOpen }) {
  e.preventDefault();
  setActive(!active);
  if (variable == "Reject") {
    setVariable(null);
  } else if (variable == "Abstain" || variable == null) {
    setVariable("Reject");
  } else {
    if (variable.length > 1) {
      onOpen();
    }
    setVariable("Reject");
  }
}

function Reject({ variable, setVariable }) {
  const [active, setActive] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className={variable == "Reject" ? "active" : "inactive"}>
      <Image
        src={RejectImage}
        alt="Reject"
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
            You have already selected a preference, selecting this option will lead your vote to be counted as Rejected 
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

export default Reject;
