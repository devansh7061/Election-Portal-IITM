import React, {useEffect} from 'react'
import TyImage from "./Thankyou.png";
import { Image } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function Thankyou() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigate("/login")
        }, 5000);
        return () => clearTimeout(timer);
      }, []);
    return (
    <Image src={TyImage}></Image>
  )
}

export default Thankyou