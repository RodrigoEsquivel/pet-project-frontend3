import {
  Box,
  ResponsiveContext,
  Form,
  FormField,
  Image,
  Heading,
  Header,
  RadioButtonGroup,
  Text,
  Anchor,
} from "grommet";
import {
  Wrapper,
  StyledTextInput,
  StyledButton,
  StyledH3,
} from "../../components/CommonComponents";
import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { useLocation, useNavigate } from "react-router";

export function CompleteFacebookSignUpPage() {
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const { email, name, lastName } = state;
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const setFromInput = (value: string, f: Function) => f(value);
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  const onSubmit = () => {
    if (
      email &&
      name &&
      lastName &&
      role &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation
    ) {
      const requestHeaders = new Headers();
      requestHeaders.append(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append("Email", email);
      urlencoded.append("Name", name);
      urlencoded.append("LastName", lastName);
      urlencoded.append("Role", role);
      urlencoded.append("Password", password);

      const requestOptions = {
        method: "POST",
        headers: requestHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      request("http://localhost:9100/user/create", requestOptions)
        .then((loginData) => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          setError(true);
        });
    }
  };
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Wrapper overflow="auto">
          <Header
            background={{ color: "#f7f1e3", opacity: "medium" }}
            align="center"
            justify="center"
          >
            <Heading level={size === "small" ? "3" : "1"}>
              Complete your account
            </Heading>
            <Box
              direction="row"
              height={size === "small" ? "xxsmall" : "xsmall"}
              width={size === "small" ? "xsmall" : "medium"}
              justify="stretch"
              pad={"small"}
            >
              <Image src={logo} />
            </Box>
          </Header>
          <Box
            responsive={true}
            fill
            align="center"
            pad="xlarge"
            gap="medium"
            justify="center"
            overflow="auto"
            background={{ color: "#f7f1e3", opacity: "medium" }}
          >
            <>
              <Box justify="center" align="center" width="xlarge" pad="xsmall">
                <Box align="center" gap="none" margin="medium" pad="none">
                  {!passwordRegex.test(password) && (
                    <Text size="xsmall">
                      Password must be of at least 8 characters and contain a
                      number, mayus and symbol
                    </Text>
                  )}
                </Box>
                <Form onSubmit={onSubmit}>
                  <Box direction="row" pad="xsmall" gap="none">
                    <FormField>
                      <StyledTextInput
                        textAlign="center"
                        placeholder="Password"
                        type="password"
                        onBlur={(e) => {
                          setFromInput(e.target.value, setPassword);
                        }}
                      ></StyledTextInput>
                    </FormField>
                    <StyledTextInput
                      textAlign="center"
                      placeholder="Confirm Password"
                      type="password"
                      size={size === "small" ? "small" : "medium"}
                      onBlur={(e) => {
                        setFromInput(e.target.value, setPasswordConfirmation);
                      }}
                    ></StyledTextInput>
                  </Box>
                  <Box align="center">
                    <RadioButtonGroup
                      name="doc"
                      options={["Buyer", "Seller"]}
                      onChange={(e) => {
                        setFromInput(e.target.value, setRole);
                      }}
                    />
                  </Box>
                  <Box margin={{ vertical: "medium" }} align="center">
                    <StyledButton
                      type="submit"
                      label="Sign Up"
                      size={"medium"}
                      color="#aaa69d"
                      disabled={
                        !(
                          role &&
                          password &&
                          passwordConfirmation &&
                          password === passwordConfirmation
                        )
                      }
                      primary
                    />
                    <Box>
                      {error && (
                        <StyledH3>Error in the account creation</StyledH3>
                      )}
                    </Box>
                    <Box>
                      {password !== passwordConfirmation && (
                        <StyledH3>The passwords aren't equal</StyledH3>
                      )}
                    </Box>
                    <Box>
                      {!(
                        email &&
                        name &&
                        lastName &&
                        role &&
                        password === passwordConfirmation
                      ) && <StyledH3>Data is not complete</StyledH3>}
                    </Box>
                    <Box>
                      {success && (
                        <Text weight="bold" color="#00C781">
                          Account created, you'll be redirected to the login
                          page
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Form>
                <Anchor
                  onClick={() => {
                    navigate("/login");
                  }}
                  label="Back to login"
                  color="#84817a"
                ></Anchor>
              </Box>
            </>
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}
