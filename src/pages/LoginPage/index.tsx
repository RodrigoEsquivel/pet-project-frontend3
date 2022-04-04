import {
  Box,
  ResponsiveContext,
  Form,
  FormField,
  Anchor,
  Image,
  Text,
} from 'grommet';
import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Wrapper,
  StyledTextInput,
  StyledButton,
  StyledH3,
} from '../../components/CommonComponents';
import { useLoginSlice } from './slice';
import logo from '../img/logo.png';
import { selectError, selectIsLogged } from './slice/selectors';
import { useNavigate } from 'react-router';
import { getToken, getUserId} from '../../utils/cookies';
import { useAuth } from '../../utils/useAuth';

export function LoginPage() {
  const dispatch = useDispatch();
  const { actions } = useLoginSlice();
  const isLogged: boolean = useSelector(selectIsLogged);
  const error: boolean = useSelector(selectError);
  const navigate = useNavigate();
  const auth = useAuth();
  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setEmail(evt.currentTarget.value));
  };
  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setPassword(evt.currentTarget.value));
  };
  const onSubmit = () => {
    dispatch(actions.fetchingData());
  };
  const stringifiedParams = queryString.stringify({
    client_id: process.env.REACT_APP_FB_ID,
    redirect_uri: 'http://localhost:3000/FacebookLogin',
    scope: ['email', 'public_profile'].join(','),
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });

  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

  useEffect(() => {
    if (isLogged) {
      const token = getToken();
      const userID = getUserId();
      auth?.signIn({token, userID});
      navigate('/Buyer');
    }
  }, [isLogged, navigate, auth, dispatch, actions]);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Wrapper overflow="auto">
          <Box
            responsive={true}
            fill="vertical"
            align="center"
            pad="xlarge"
            gap="medium"
            justify="center"
            background={{ color: '#f7f1e3', opacity: 'medium' }}
          >
            <>
              <Box justify="center" align="center" width="large" pad="large">
                <Form>
                  <Box height="xsmall" width={size==="medium"? "medium":"small"}>
                    <Image src={logo}></Image>
                  </Box>
                  <Box gap="medium" pad={{ top: 'medium' }}>
                    <FormField margin={{ horizontal: 'xlarge' }}>
                      <StyledTextInput
                        onChange={onChangeEmail}
                        textAlign="center"
                        placeholder="Email"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                    <FormField margin={{ horizontal: 'xlarge' }}>
                      <StyledTextInput
                        onChange={onChangePassword}
                        textAlign="center"
                        type="password"
                        placeholder="Password"
                        size={''}
                      ></StyledTextInput>
                    </FormField>
                  </Box>
                  <Box pad={'medium'} align="center" justify="start">
                    <Text>
                      Don't have an account?
                    </Text>
                    <Anchor onClick={()=> navigate('/SignUp')} label=" Sign Up" size={''} color="#84817a"/>
                    <Anchor href={facebookLoginUrl} label=" Login with facebook" size={''} color="#84817a"/>
                    <Box height={''} width={''}>
                      <StyledButton
                        onClick={onSubmit}
                        type="submit"
                        label="Login"
                        size={'medium'}
                        color="#aaa69d"
                        primary
                      />
                    </Box>
                    <Box>
                      {error && (
                        <StyledH3>Incorrect email and/or password</StyledH3>
                      )}
                    </Box>
                  </Box>
                </Form>
              </Box>
            </>
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}
