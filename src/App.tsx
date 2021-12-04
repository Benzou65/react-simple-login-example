import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Heading } from "@chakra-ui/layout";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <Box>
      <Center>
        <Heading as={"h1"}>React Simple Login Example</Heading>
      </Center>
      <Flex
        justifyContent={"flex-end"}
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link as={ReactRouterLink} to="/login" mx={2}>
          Login
        </Link>{" "}
        |{" "}
        <Link as={ReactRouterLink} to="/signup" mx={2}>
          Signup
        </Link>
      </Flex>
      <Outlet />
    </Box>
  );
}

export default App;
