import React, { useState } from "react";
import { Card, CardBody, Image } from "@chakra-ui/react";
import "./Reject.css";
import RejectImage from "./Reject.png";

function handleClick(e, { active, setActive, setVariable, variable }) {
  e.preventDefault();
  setActive(!active);
  if (variable == "Reject") {
    setVariable(null);
  } else {
    setVariable("Reject");
  }
}

function Reject({ variable, setVariable }) {
  const [active, setActive] = useState(false);
  return (
    <div>
      <Card
        maxW="sm"
        onClick={(e) =>
          handleClick(e, { active, setActive, variable, setVariable })
        }
      >
        <CardBody>
          <div className={variable == "Reject" ? "active" : ""}>
            <Image
              src={RejectImage}
              alt="Reject"
              borderRadius="lg"
              boxSize="250px"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Reject;
