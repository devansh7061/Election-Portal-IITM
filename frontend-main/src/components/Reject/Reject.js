import React, {useState} from 'react'
import {
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";
import "./Reject.css";

function handleClick(e, { active, setActive,setVariable, variable }) {
  e.preventDefault();
  setActive(!active);
  if (variable == "Reject") {
    setVariable(null);
  } else {
    setVariable("Reject");
  }
}

function Reject({variable, setVariable}) {
  const [active, setActive] = useState(false);
  return (
    <div className={variable == "Reject" ? "active" : ""}>
      <Card
        maxW="sm"
        onClick={(e) => handleClick(e, { active, setActive, variable, setVariable })}
        variant={variable == "Reject" ? "filled" : "outline"}
      >
        <CardBody>
          <Image
            src="https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2016/miscellaneous/23102016082903right-to-reject.jpg&w=900&height=601"
            alt="Reject"
            borderRadius="lg"
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Reject
