import React, {useState} from 'react'
import { Card, CardBody, Image } from "@chakra-ui/react";
import "./Abstain.css";
import AbstainImage from "./Abstain.png"

function handleClick(e, { active, setActive, variable, setVariable }) {
  e.preventDefault();
  setActive(!active);
  if (variable == "Abstain") {
    setVariable(null);
  } else {
    setVariable("Abstain");
  }
}

function Abstain({ variable, setVariable }) {
  const [active, setActive] = useState(false);
  return (
    <div className={variable == "Abstain" ? "active" : "inactive"}>
      <Image
        src={AbstainImage}
        alt="Abstain"
        borderRadius="lg"
        boxSize="250px"
        onClick={(e) =>
          handleClick(e, { active, setActive, variable, setVariable })
        }
      />
    </div>
  );
}

export default Abstain
