import React, { useEffect, useRef } from "react";
import Nav from "../component/Nav";
import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import Typed from "typed.js";

const Home = () => {
  const element = useRef();
  const { colorMode } = useColorMode();
  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: ["Experiance", "Development", "EFFICEENCY"],
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
      {/* first landing page */}
      <main style={{ padding: "20px" }}>
          <div style={{ height: "100px" }}>
            <Nav />
          </div>
          <div style={{ height: "500px" }}>
            <Flex
              height={"100%"}
              flexDir={"column"}
              justifyContent="center"
              alignItems="center"
            >
              <Text
                color={colorMode === "light" ? "gray.700" : "gray.200"}
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
              <Button
                 mt={8}
                textColor="white"
                borderRadius={"0px"}
                bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
                bgClip="Button"
              >
                GET STARTED
              </Button>
            </Flex>
          </div>
          <div style={{ height: "100px" }}>
          </div>
          <div style={{ height:"500px" }}>

          </div>
      </main>
    </>
  );
};

export default Home;
