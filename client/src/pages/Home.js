import React, { useEffect, useRef } from "react";
import Nav from "../component/Nav";
import { Button, color, Flex, Text,useColorMode } from "@chakra-ui/react";
import Typed from "typed.js";

const Home = () => {
  const element = useRef();
  const {colorMode}=useColorMode();
  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: ["BETTER", "", "EFFICENCY"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <Nav />
      <Flex
        mt={"-40px"}
        flexDir={"row"}
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
      >
        <Flex
          width={"80%"}
          height={"50vh"}
          borderRadius={"50px"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Flex flexDir={"column"} justifyContent="center" alignItems={"center"}>
          <Text
            color={ colorMode==='light'?'gray.700':"gray.200"}
            fontSize="6xl"
            fontWeight="extrabold"
          >
            WELCOME
          </Text>
          <Text
            bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            FOR <span ref={element}></span>
          </Text>
          <Button mt={"100px"} textColor="white" borderRadius={"0px"}  bgGradient={"linear( to-r, #57ebde, #aefb2a)"} bgClip="Button" >GET STARTED</Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex height={"100vh"} background={ colorMode==='light' ? "#dddddd":""}>

      </Flex>
    </>
  );
};

export default Home;
