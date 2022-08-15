import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  FaAngleDown,
  FaBell,
  FaHeart,
  FaHome,
  FaPersonBooth,
} from "react-icons/fa";
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { FaBars } from "react-icons/fa";
import SideNavItems from "./SideNavItems";
const User = () => {
  const [navSize, setNavSize] = useState("large");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUser] = useState([]);
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/employees/all", {
          signal: controller.signal,
        });
        isMounted && setUser(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Flex
      position={"sticky"}
      left="5"
      h={"95vh"}
      marginTop="2.5vh"
      boxShadow={"0 4px 12px 0 rgba(0,0,0,0.5)"}
      w={navSize === "large" ? "200px" : "75px"}
      flexDir={"column"}
      justifyContent="space-between"
    >
      <Flex
        p={"5%"}
        flexDir="column"
        alignItems={navSize === "large" ? "flex-start" : "center"}
        as="nav"
      >
        <IconButton
          background={"none"}
          mt={5}
          _hover={{ background: "none" }}
          icon={<FaBars />}
          onClick={() => {
            navSize === "large" ? setNavSize("small") : setNavSize("large");
          }}
        />
        {/* start of nav item */}
        <SideNavItems sideNav={navSize} icon={FaHome} title="HOME" />
        <SideNavItems sideNav={navSize} icon={FaHeart} title="Heart" />
        <SideNavItems sideNav={navSize} icon={FaPersonBooth} title="Booth" />
        <SideNavItems sideNav={navSize} icon={FaAngleDown} title="Down" />
        <SideNavItems sideNav={navSize} icon={FaBell} title="Bell" />
      </Flex>

      <Flex
        p={"5%"}
        flexDir="column"
        w="100%"
        alignItems={navSize === "large" ? "flex-start" : "center"}
        mb={4}
      >
        <Divider />
        <Flex mt={4} align="center">
          <Avatar size={"sm"} />
          {navSize === "large" ? (
            <Flex flexDir={"column"} ml={"4"}>
              <Heading as={"h3"} size="sm">
                {auth?.username.toUpperCase()}
              </Heading>
              <Text color={"gray"}>User</Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default User;
