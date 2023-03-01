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
    <div className={variable == "Reject" ? "active" : "inactive"}>
      <Image
        src={RejectImage}
        alt="Reject"
        borderRadius="lg"
        boxSize="250px"
        onClick={(e) =>
          handleClick(e, { active, setActive, variable, setVariable })
        }
      />
    </div>
  );
}

export default Reject;
