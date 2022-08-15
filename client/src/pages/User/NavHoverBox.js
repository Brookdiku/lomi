import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";

const NavHoverBox = ({ icon, title, description }) => {
  return (
    <>
      <Flex
        pos="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        w={0}
        h={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        //borderRight="10px solid white"
        style={{ 
          borderRight: "1px solid",
                  borderImage: "linear-gradient(45deg, #57ebde, #aefb2a) 1",
         }}
      />
      <Flex
        h={200}
        w="100%"
        style={{ 
          border: "1px solid",
                  borderImage: "linear-gradient(45deg, #57ebde, #aefb2a) 1",
         }}
        flexDir="column"
        alignItems={"center"}
        justify="center"
        backgroundColor="transparent"
        borderRadius={"25px"}
        //border="0.15px solid white"
        color="#fff"
        textAlign="center"
      >
        <Icon as={icon} fontSize="3xl" mb={4} />
        <Heading size={"md"} fontWeight="normal">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export default NavHoverBox;
