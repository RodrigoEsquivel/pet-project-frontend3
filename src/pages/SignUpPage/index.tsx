/**
 *
 * SignUpPage
 *
 */
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
} from 'grommet';
import {
  Wrapper,
  StyledTextInput,
  StyledButton,
  StyledH3,
} from '../../components/CommonComponents';
import React, { useEffect } from 'react';
import logo from '../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpSlice } from './slice';
import {
  selectAlreadyRegistered,
  selectEmail,
  selectError,
  selectLastName,
  selectName,
  selectPassword,
  selectPasswordConfirmation,
  selectRole,
  selectSignUpSuccess,
} from './slice/selectors';
import { useNavigate } from 'react-router';

interface Props {}

export function SignUpPage(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useSignUpSlice();
  const error = useSelector(selectError);
  const name = useSelector(selectName);
  const lastName = useSelector(selectLastName);
  const role = useSelector(selectRole);
  const password = useSelector(selectPassword);
  const email = useSelector(selectEmail);
  const passwordConfirmation = useSelector(selectPasswordConfirmation);
  const signUpSuccess = useSelector(selectSignUpSuccess);
  const alreadyRegistered = useSelector(selectAlreadyRegistered);
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  );
  const navigate = useNavigate();
  const onSubmit = () => {
    if (
      email &&
      name &&
      lastName &&
      role &&
      password === passwordConfirmation
    ) {
      dispatch(actions.fetchingData());
    }
  };
  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setName(evt.currentTarget.value));
  };
  const onChangeLastName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setLastName(evt.currentTarget.value));
  };
  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRegex.test(evt.currentTarget.value)) {
      dispatch(actions.setEmail(evt.currentTarget.value));
    }
  };
  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordRegex.test(evt.currentTarget.value)) {
      dispatch(actions.setPassword(evt.currentTarget.value));
    }
  };
  const onChangePasswordConfirmation = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(actions.setPasswordConfirmation(evt.currentTarget.value));
  };
  const onChangeRole = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setRole(evt.currentTarget.value));
  };
useEffect(() => {
    setTimeout(() => {
      if (signUpSuccess) {
        navigate('/login');
      }
    }, 3000);
  }, [signUpSuccess, navigate]);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Wrapper overflow="auto">
          <Header
            background={{ color: 'accent-3', opacity: 'medium' }}
            align="center"
            justify="center"
          >
            <Heading> Create an account </Heading>
            <Box
              direction="row"
              height="xsmall"
              width="medium"
              justify="stretch"
              pad={'small'}
            >
              <Image src={logo}></Image>
            </Box>
          </Header>
          <Box
            responsive={true}
            fill="vertical"
            align="center"
            pad="xlarge"
            gap="medium"
            justify="center"
            background={{ color: 'accent-3', opacity: 'medium' }}
          >
            <>
              <Box justify="center" align="center" width="xlarge" pad="xsmall">
                <Box align="end" gap="none" margin="medium" pad="none">
                  {!passwordRegex.test(password) && (
                    <Text size="xsmall">
                      Password must be of at least 8 characters and contain a
                      number, mayus and symbol
                    </Text>
                  )}
                </Box>
                <Form onSubmit={onSubmit}>
                  <Box direction="row" gap="none" pad="xsmall">
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeName}
                        textAlign="center"
                        placeholder="Name"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeLastName}
                        textAlign="center"
                        placeholder="Last Name"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                  </Box>

                  <Box direction="row" pad="xsmall" gap="none">
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeEmail}
                        textAlign="center"
                        placeholder="Email"
                        type="email"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangePassword}
                        textAlign="center"
                        placeholder="Password"
                        type="password"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                  </Box>
                  <Box margin={{ horizontal: 'xlarge', bottom: 'small' }}>
                    <StyledTextInput
                      onChange={onChangePasswordConfirmation}
                      textAlign="center"
                      placeholder="Confirm Password"
                      type="password"
                      size={''}
                    ></StyledTextInput>
                  </Box>
                  <Box align="center">
                    <RadioButtonGroup
                      onChange={onChangeRole}
                      name="doc"
                      options={['Buyer', 'Seller']}
                    />
                  </Box>
                  <Box margin={{ vertical: 'medium' }} align="center">
                    <StyledButton
                      type="submit"
                      label="Sign Up"
                      size={'medium'}
                      color="#5D8BF4"
                      disabled={
                        !(
                          email &&
                          name &&
                          lastName &&
                          role &&
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
                      {alreadyRegistered && (
                        <StyledH3>Email already registered</StyledH3>
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
                      {signUpSuccess && (
                        <Text weight="bold" color="#7de83f">
                          Account created, you'll be redirected to the login
                          page
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Form>
                <Anchor href="/login" label="Back to login"></Anchor>
              </Box>
            </>
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}
