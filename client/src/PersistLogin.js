/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/useRefreshToken";
import { useAuth } from "./hooks/useAuth";
import { Flex, Spinner } from "@chakra-ui/react";
const PersistLogin = () => {
  let isMounted = true;
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {}, [isLoading]);
  return (
    <>
      {isLoading ? (
        <Flex height={"100vh"} justifyContent={"center"} alignItems="center">
          <Spinner size={"xl"} color="#dddddd" />
        </Flex>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
