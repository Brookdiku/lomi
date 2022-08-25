import React, { useEffect, useRef, useState } from "react";
import axios from "../api/Axios";
import { useAuth } from "../hooks/useAuth";
import {
  Flex,
  Text,
  Stack,
  Checkbox,
  Button,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import InputBox from "../component/InputBox";
const Login = () => {
  useEffect(() => {
    input.current.focus();
  }, []);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const input = useRef();
  const from = location?.state?.from?.pathname || "/";
  const { colorMode } = useColorMode();
  const [username, setUsername] = useState("");
  const [usernameValidator, setUsernameValidator] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValidator, setPasswordValidator] = useState(true);
  const [message, setMessage] = useState("");
  const [isFirstFill, setFirstFill] = useState(true);
  const [userFocused, setUserFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    if (username !== "") {
      setUsernameValidator(true);
    } else {
      setUsernameValidator(false);
    }
  }, [username]);

  useEffect(() => {
    if (password !== "") {
      setPasswordValidator(true);
    } else {
      setPasswordValidator(false);
    }
  }, [password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFirstFill(false);
    if (usernameValidator && passwordValidator) {
      try {
        const response = await axios.post("/login", {
          username: username,
          password: password,
        });
        const roles = response?.data?.roles;
        const accessToken = response?.data?.accessToken;
        const name = response?.data?.username;
        setAuth({ username: name, accessToken, roles });
        setMessage(response?.data?.message);
        console.log(response?.data?.message);
        setUsername("");
        setPassword("");
        navigate("/user");
      } catch (error) {
        if (error?.response?.data?.message === undefined) {
          setMessage("oops! connection error with our server");
        } else {
          setMessage(error?.response?.data?.message);
        }
      }
    } else {
      setMessage("please fill the form correctly");
    }
  };
  return !auth?.username ? (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <Flex justifyContent="center" alignItems="center">
          <div style={{ height: "600px", width: "800px" }}>
            <Flex p={"30px"}>
              {/* left column */}
              <Flex flexDir={"column"} flex={1}>
                <Flex flexDir={"column"} height="100%">
                  <Text
                    fontWeight={"bold"}
                    color={"#aefb2a"}
                    as={"h4"}
                    fontSize="2xl"
                  >
                    LOMI
                  </Text>
                  <Text
                    fontSize="13px"
                    fontWeight={"normal"}
                    color={"#CECFD5"}
                    as={"p"}
                  >
                    an event managing website majorly works in Ethiopia.
                  </Text>
                </Flex>
              </Flex>
              {/* right column */}
              <Flex flex={1} flexDir={"column"}>
                <div style={{ height: "100px", paddingTop: "10px" }}>
                  <Flex
                    justifyContent="center"
                    flexDir={"column"}
                    alignItems="flex-start"
                  >
                    <Text
                      fontSize={"13px"}
                      mb="1"
                      fontWeight="medium"
                      color={"#AFB0B7"}
                    >
                      Its been long welcome!
                    </Text>
                    <Text
                      width={"100%"}
                      textAlign={"left"}
                      fontSize="2xl"
                      fontWeight="bold"
                      color={colorMode === "light" ? "#3A4459" : "gray.200"}
                      mb="10px"
                    >
                      Sign in to LOMI
                    </Text>
                    <Text
                      fontSize={"15px"}
                      fontWeight="normal"
                      color={"#CECDD1"}
                    >
                      New here? create an account{" "}
                      <Link color={"#aefb2a"} fontWeight="medium">
                        Sign up
                      </Link>
                    </Text>
                    <Text
                      mt={"15px"}
                      fontWeight={"bold"}
                      as={"p"}
                      fontSize="12px"
                      color={
                        message === "registered successfully."
                          ? "#aefb2a"
                          : "#F73430"
                      }
                    >
                      { message.toUpperCase()}
                    </Text>
                  </Flex>
                </div>
                <div style={{ height: "400px" }}>
                  <Stack
                    justifyContent="center"
                    justifyItems="center"
                    spacing={3}
                    height={"100%"}
                  >
                    <InputBox
                      setIsFocused={setUserFocused}
                      isFocused={userFocused}
                      isFilledCorrect={usernameValidator}
                      isFirstFill={isFirstFill}
                      icon={FaUser}
                      inputref={input}
                      variant={"flushed"}
                      placeholder={"username"}
                      value={username}
                      setValue={setUsername}
                    />
                    <InputBox
                      setIsFocused={setPasswordFocused}
                      isFocused={passwordFocused}
                      isFilledCorrect={passwordValidator}
                      isFirstFill={isFirstFill}
                      icon={FaLock}
                      type="password"
                      variant={"flushed"}
                      placeholder={"password"}
                      value={password}
                      setValue={setPassword}
                    />
                    <Flex
                      width={"100%"}
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Checkbox size="md" colorScheme="green" defaultChecked>
                        <small>Remember me</small>
                      </Checkbox>
                    </Flex>
                    <Button
                      disabled={
                        !passwordValidator || !usernameValidator ? true : false
                      }
                      onClick={(e) => handleLogin(e)}
                      bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
                      bgClip="Button"
                      color={"white"}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </div>
                <div style={{ height: "100px" }}>
                  <Flex
                    flexDir="column"
                    justifyContent={"center"}
                    alignItems="center"
                    height={"100%"}
                  >
                    <Text color={"#BBBBBD"}>
                      <small>
                        By using this service you agreed with our <br />{" "}
                        <span
                          style={{ color: "#aefb2a", fontWeight: "normal" }}
                        >
                          Privacy policy
                        </span>{" "}
                        and
                        <span
                          style={{ color: "#aefb2a", fontWeight: "normal" }}
                        >
                          {" "}
                          Terms of Service{" "}
                        </span>{" "}
                        apply
                      </small>
                    </Text>
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </div>
    </>
  ) : (
    <>
      <Navigate to={from} replace />
    </>
  );
};
export default Login;
