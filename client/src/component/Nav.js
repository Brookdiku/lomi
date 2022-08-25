import {
  Button,
  Spacer,
  useColorMode,
  Text,
  IconButton,
  WrapItem,
  Avatar,
  Flex,
  Link,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Stack,
  textDecoration,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import  axios from "../api/Axios";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { FaMailBulk, FaQuestion, FaSlidersH, FaUserEdit } from "react-icons/fa";
const Nav = () => {
  const navigate = useNavigate();
  const { auth,setAuth } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const styles = {
    button: {
      marginRight: "10px",
    },
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout")
      if(response.status==200)setAuth({})
      navigate(0)
    } catch (error) {
      console.error(error);
    }
    
  };
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p={"30px 100px"}
    >
      <Flex>
        <Text
          bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          APP
        </Text>
      </Flex>
      {/* <Flex
        pl={"60px"}
        width="100%"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link
          _hover={{
            textDecoration: "none",
            fontSize: "17px",
            color: "#aefb2a",
          }}
          mr={"10px"}
          fontWeight={"medium"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          href="#"
        >
          DOCS
        </Link>
        <Link
          _hover={{
            textDecoration: "none",
            fontSize: "17px",
            color: "#aefb2a",
          }}
          mr={"10px"}
          fontWeight={"medium"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          href="#"
        >
          ABOUT
        </Link>
        <Link
          _hover={{
            textDecoration: "none",
            fontSize: "17px",
            color: "#aefb2a",
          }}
          mr={"10px"}
          fontWeight={"medium"}
          color={colorMode === "light" ? "gray.700" : "gray.200"}
          href="#"
        >
          CONTACT
        </Link>
      </Flex> */}

      <Flex alignItems={"center"}>
        {!auth?.username ? (
          <>
            <Button
              style={{ marginRight: styles.button.marginRight }}
              bgGradient={"linear(to-r, #57ebde, #aefb2a)"}
              bgClip="Button"
              borderRadius={"0px"}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              style={{
                border: "1px solid",
                borderImage: "linear-gradient(45deg, #57ebde, #aefb2a) 1",
                marginRight: styles.button.marginRight,
              }}
              onClick={() => navigate("/register")}
              variant="outline"
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            <Popover>
              <PopoverTrigger>
                <WrapItem mr={styles.button.marginRight}>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    size="md"
                    name={auth?.username}
                    src="https://bit.ly/sage-adebayo"
                  />
                </WrapItem>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>
                    <Flex alignItems={"center"}>
                      <Avatar
                        style={{ cursor: "pointer" }}
                        size="md"
                        name={auth?.username}
                        src="https://bit.ly/sage-adebayo"
                        mr={2}
                      />
                      welcome {auth?.username}
                    </Flex>
                  </PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack spacing={4}>
                      <Link
                        _hover={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#aefb2a",
                        }}
                      >
                        <Icon as={FaUserEdit} mr={2} />
                        Profile
                      </Link>
                      <Link
                        _hover={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#aefb2a",
                        }}
                      >
                        <Icon as={FaMailBulk} mr={2} />
                        Inbox
                      </Link>
                      <Link
                        _hover={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#aefb2a",
                        }}
                      >
                        <Icon as={FaSlidersH} mr={2} />
                        Settings
                      </Link>
                      <Link
                        _hover={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#aefb2a",
                        }}
                      >
                        <Icon as={FaQuestion} mr={2} />
                        Help
                      </Link>
                    </Stack>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button onClick={() => handleLogout()}>Sign out</Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
        )}
        <IconButton
          size="lg"
          onClick={() => {
            colorMode === "light"
              ? toggleColorMode("dark")
              : toggleColorMode("light");
          }}
          colorScheme="gray"
          aria-label="Search database"
          style={{ borderRadius: "50%" }}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </Flex>
    </Flex>
  );
};

export default Nav;
