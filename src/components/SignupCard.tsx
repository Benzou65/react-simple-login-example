import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "./utils";

interface SignupInfos {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [signupInfos, setSignupInfos] = useState<SignupInfos>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_SIGNUP_ROUTE as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: signupInfos.firstName,
        lastName: signupInfos.lastName,
        email: signupInfos.email,
        password: hashPassword(signupInfos.password),
      }),
    })
      .then((res) => {
        console.log(`res.status`, res.status);
        if (res.status === 200) {
          navigate("/login");
        } else if (res.status === 401) {
          throw new Error("Email already used");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={signupInfos.firstName}
                    onChange={(e) =>
                      setSignupInfos({
                        ...signupInfos,
                        firstName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={signupInfos.lastName}
                    onChange={(e) =>
                      setSignupInfos({
                        ...signupInfos,
                        lastName: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={signupInfos.email}
                onChange={(e) =>
                  setSignupInfos({ ...signupInfos, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={signupInfos.password}
                  onChange={(e) =>
                    setSignupInfos({ ...signupInfos, password: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
