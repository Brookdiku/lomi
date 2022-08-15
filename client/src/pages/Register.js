import React, { useEffect, useRef, useState } from "react";
import axios from "../api/Axios";
import {
  Flex,
  Text,
  Button,
  Stack,
  Checkbox,
  useColorMode,
  Link,
  Box,
  // Image,
  // Box,
} from "@chakra-ui/react";
import { USERNAME_REGEX, PASSWORD_REGEX } from "../regex/regex";
import InputBox from "../component/InputBox";
import { FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
const Register = () => {
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isFirstFill, setFirstFill] = useState(true);
  const [userFocused, setUserFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const handleRegister = async (e) => {
    setFirstFill(false);
    e.preventDefault();
    if (usernameValidator && passwordValidator) {
      try {
        const response = await axios.post("/register", {
          username: username,
          password: password,
        });
        if (!response) console.log(response.data);
        setMessage(response?.data?.message);
        const name = response?.data?.username;
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ username: name, accessToken: accessToken, roles: roles });
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate(from, { replace: true });
      } catch (error) {
        console.error(error);
        if(error?.response?.status===409) {
          setMessage(username+ error.response?.data?.message)
        }else{
          setMessage(error.response?.data?.message);
        }
      }
    } else {
      setMessage("please fill the form correctly");
    }
  };
  console.log("access Token" + auth?.accessToken);
  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    if (result) {
      setUsernameValidator(true);
    } else {
      setUsernameValidator(false);
    }
    setMessage("")
  }, [username]);
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    const result2 = password === confirmPassword ? true : false;
    if (result && result2) {
      setPasswordValidator(true);
    } else {
      setPasswordValidator(false);
    }
    setMessage("")
  }, [password, confirmPassword]);
  return (
    <>
      {!auth?.accessToken ? (
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
                        START FOR FREE
                      </Text>
                      <Text
                        width={"100%"}
                        textAlign={"left"}
                        fontSize="2xl"
                        fontWeight="bold"
                        color={colorMode === "light" ? "#3A4459" : "gray.200"}
                        mb="10px"
                      >
                        Sign up to LOMI
                      </Text>
                      <Text
                        fontSize={"15px"}
                        fontWeight="normal"
                        color={"#CECDD1"}
                      >
                        Already a member?{" "}
                        <Link color={"#aefb2a"} fontWeight="medium">
                          Sign in
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
                        {message.toUpperCase()}
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

                      {!usernameValidator ? (
                        <Flex
                          width={"100%"}
                          p={"2"}
                          backgroundColor={
                            colorMode === "light" ? "#FAFBFC" : ""
                          }
                        >
                          <Text
                            color={colorMode === "light" ? "#3E4553" : "white"}
                          >
                            <small>
                              username must be more than four character, your
                              username shoud start with a letter.
                            </small>
                          </Text>
                        </Flex>
                      ) : (
                        <></>
                      )}
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
                      <InputBox
                        setIsFocused={setConfirmPasswordFocused}
                        isFocused={confirmPasswordFocused}
                        isFilledCorrect={passwordValidator}
                        isFirstFill={isFirstFill}
                        icon={FaLock}
                        variant={"flushed"}
                        type="password"
                        placeholder={"confirm password"}
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                      />
                      {!passwordValidator ? (
                        <Flex
                          width={"100%"}
                          p={"2"}
                          backgroundColor={
                            colorMode === "light" ? "#FAFBFC" : ""
                          }
                        >
                          <Text
                            color={colorMode === "light" ? "#3E4553" : "white"}
                          >
                            <small>
                              password must be more than eight character, your
                              password shoud contain letter, number and !@#$
                              characters.
                            </small>
                          </Text>
                        </Flex>
                      ) : (
                        <></>
                      )}
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
                          !passwordValidator || !usernameValidator
                            ? true
                            : false
                        }
                        onClick={(e) => handleRegister(e)}
                        bgGradient={"linear( to-r, #57ebde, #aefb2a)"}
                        bgClip="Button"
                        color={"white"}
                      >
                        Create an account
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
      ) : (
        <Navigate to={"/"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default Register;
