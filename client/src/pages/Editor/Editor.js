import {
  Flex,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  Center,
  Button,
  PopoverContent,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBars, FaHome, FaCalendarCheck } from "react-icons/fa";
import InputBox from "../../component/InputBox";
import SideNavItems from "../User/SideNavItems";

const Editor = () => {
  const [navSize, setNavSize] = useState("large");
  return (
    <div style={{ height: "100vh" }}>
      <Flex>
        <Flex
          position={"sticky"}
          h={"100vh"}
          boxShadow={"0 4px 12px 0 rgba(0,0,0,0.5)"}
          w={navSize === "large" ? "200px" : "75px"}
          flexDir={"column"}
          bgColor="#1F263C"
          justifyContent="space-between"
        >
          <Flex
            pt="5px"
            flexDir="column"
            alignItems={navSize === "large" ? "flex-start" : "center"}
            as="nav"
          >
            <div style={{ height: "100px" }}>
              <Flex alignItems={"center"} p="5px">
                <IconButton
                  background={"none"}
                  justifyContent="center"
                  alignItems={"center"}
                  _hover={{ background: "none" }}
                  icon={<FaBars />}
                  onClick={() => {
                    navSize === "large"
                      ? setNavSize("small")
                      : setNavSize("large");
                  }}
                />

                {navSize === "large" ? (
                  <Text
                    fontSize="xl"
                    fontWeight="extrabold"
                    bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
                    bgClip="text"
                    as={"h2"}
                  >
                    Lomi
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
            </div>
            <SideNavItems sideNav={navSize} icon={FaHome} title="Dashboard" />

            <Flex
              mt={30}
              flexDir="column"
              w="100%"
              alignItems={navSize === "large" ? "flex-start" : "center"}
            >
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Button>Click Me</Button>
                </PopoverTrigger>
                <PopoverContent
                  w={"150px"}
                  bgColor="transparent"
                  borderRadius="0px"
                  border={"none"}
                >
                  <SideNavItems
                    sideNav={navSize}
                    icon={FaCalendarCheck}
                    title="Create"
                  />
                  <SideNavItems
                    sideNav={navSize}
                    icon={FaCalendarCheck}
                    title="Events"
                  />
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
        </Flex>
        {/* this is the the landing */}
        <Flex
          height={"60px"}
          bgColor="#1F263C"
          w="100%"
          boxShadow={"0 0px 12px 0 rgba(0,0,0,0.5)"}
          p="5px 50px"
          justifyContent="flex-end"
          alignItems={"center"}
        >
          <div style={{ width: "200px" }}>
            {/* <InputBox /> */}
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default Editor;
