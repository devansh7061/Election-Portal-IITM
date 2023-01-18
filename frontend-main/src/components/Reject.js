import React from 'react'
import {
  Card,
  CardBody,
  Image,
} from "@chakra-ui/react";
function Reject() {
  return (
    <div>
      <Card maxW="sm">
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
