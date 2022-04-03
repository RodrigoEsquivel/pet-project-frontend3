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
import { useModifyUserSlice } from './slice';
import {
  selectUserNotFound,
  selectEmail,
  selectLastName,
  selectName,
  selectPassword,
  selectNewPassword,
  selectNewPasswordConfirmation,
  selectRole,
  selectDeleteError,
  selectDeleteSuccess,
  selectLoadError,
  selectModifyError,
  selectModifySuccess,
} from './slice/selectors';
import {useAuth} from '../../utils/useAuth';
import { useNavigate } from 'react-router';

export function ModifyUserPage() {
  const dispatch = useDispatch();
  const { actions } = useModifyUserSlice();
  const auth = useAuth();
  const userNotFound = useSelector(selectUserNotFound);
  const name = useSelector(selectName);
  const lastName = useSelector(selectLastName);
  const role = useSelector(selectRole);
  const password = useSelector(selectPassword);
  const email = useSelector(selectEmail);
  const newPassword = useSelector(selectNewPassword);
  const newPasswordConfirmation = useSelector(selectNewPasswordConfirmation);
  const modifySuccess = useSelector(selectModifySuccess);
  const modifyError = useSelector(selectModifyError);
  const loadError = useSelector(selectLoadError);
  const deleteSuccess = useSelector(selectDeleteSuccess);
  const deleteError = useSelector(selectDeleteError);
  const emailRegex = new RegExp(
    // eslint-disable-next-line no-useless-escape
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
      password &&
      newPassword &&
      newPassword === newPasswordConfirmation
    ) {
      dispatch(actions.isModifying());
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
  const onChangeNewPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordRegex.test(evt.currentTarget.value)) {
      dispatch(actions.setNewPassword(evt.currentTarget.value));
    }
  };
  const onChangeNewPasswordConfirmation = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(actions.setNewPasswordConfirmation(evt.currentTarget.value));
  };
  const onChangeRole = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setRole(evt.currentTarget.value));
  };
  const LogOutOnClick = () => {
    auth?.signOut();
  }
  useEffect(() => {
    setTimeout(() => {
      if (modifySuccess) {
        dispatch(actions.setModifySuccess(false));
        navigate('/Buyer');
      }
    }, 3000);
  }, [actions, dispatch, modifySuccess, navigate]);

  useEffect(() => {
    if(deleteSuccess){
      auth?.signOut();
      dispatch(actions.setDeleteSuccess(false));
      setTimeout(() => {navigate('/login');}, 3000);
    }
    
  }, [deleteSuccess, navigate, auth, dispatch, actions]);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Wrapper overflow="auto" >
          <Header
            background={{ color: '#f7f1e3', opacity: 'medium' }}
            align="center"
            justify="center"
            onLoad={()=>dispatch(actions.isLoading())}
          >
            <Heading level={size==="small"?"3":"1"}> Modify my account </Heading>
            <Box
              direction="row-responsive"
              height={size==="small"?"xxsmall":"xsmall"}
              width={size==="small"?"xsmall":"medium"}
              justify="stretch"
              pad={'small'}
            >
              <Image src={logo}></Image>
            </Box>
            <StyledButton href="/login" color="#d1ccc0" secondary label="Log Out" onClick={LogOutOnClick}/>
          </Header>
          <Box
            background={{ color: '#f7f1e3', opacity: 'medium' }}
            responsive={true}
            fill
            align="center"
            pad="xlarge"
            gap="medium"
            justify="center"
            overflow="hidden"
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
                  <Box direction="row" gap="none" pad="xsmall">
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeName}
                        textAlign="center"
                        placeholder="Name"
                        value={name}
                      ></StyledTextInput>
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeLastName}
                        textAlign="center"
                        placeholder="Last Name"
                        value={lastName}
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
                        value={email}
                      ></StyledTextInput>
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangePassword}
                        textAlign="center"
                        placeholder="Current password"
                        type="password"
                      ></StyledTextInput>
                    </FormField>
                  </Box>
                  <Box pad="xsmall" gap="none" direction="row">
                    <StyledTextInput
                      onChange={onChangeNewPassword}
                      textAlign="center"
                      placeholder="New Password"
                      type="password"
                    ></StyledTextInput>
                    <StyledTextInput
                      onChange={onChangeNewPasswordConfirmation}
                      textAlign="center"
                      placeholder="Confirm your new password"
                      type="password"
                    ></StyledTextInput>
                  </Box>
                  <Box align="center">
                    <RadioButtonGroup
                      onChange={onChangeRole}
                      name="doc"
                      options={['Buyer', 'Seller']}
                      value={role}
                    />
                  </Box>
                  <Box gap="none" margin={{ vertical: 'none' }} justify="center" direction="row">
                    <StyledButton
                      type="submit"
                      label="Modify Account"
                      size={'medium'}
                      color="#aaa69d"
                      disabled={
                        !(
                          email &&
                          name &&
                          lastName &&
                          role &&
                          password &&
                          newPassword &&
                          newPassword === newPasswordConfirmation
                        )
                      }
                      primary
                    />
                    <StyledButton
                      label="Delete Account"
                      size={'medium'}
                      color="#FF4040"
                      onClick={() => {dispatch(actions.isDeleting());}}
                    />           
                  </Box>
                  <Box margin="none" gap="none" pad="none" align="center">
                      {modifyError && (
                        <StyledH3>Error in the account modification</StyledH3>
                      )}
                      {deleteError && (
                        <StyledH3>Error in the account deletion</StyledH3>
                      )}
                      {loadError && (
                        <StyledH3>Error in the account data load</StyledH3>
                      )}
                      {userNotFound && (
                        <StyledH3>User trying to be loaded wasn't found</StyledH3>
                      )}
                      {newPassword !== newPasswordConfirmation && (
                        <StyledH3>The new passwords aren't equal</StyledH3>
                      )}
                      {!(
                        email &&
                        name &&
                        lastName &&
                        role &&
                        password &&
                        newPassword &&
                        newPassword === newPasswordConfirmation
                      ) && <StyledH3>Data is not complete</StyledH3>}
                      {modifySuccess && (
                        <Text weight="bold" color="#00C781">
                          Account modified, you'll be redirected to the products
                          page
                        </Text>
                      )}
                      {deleteSuccess && (
                        <Text weight="bold" color="#00C781">
                          Account deleted, you'll be redirected to the login
                          page
                        </Text>
                      )}
                    </Box>
                </Form>
                <Anchor onClick={()=> navigate('/Seller')} color="#84817a" label="Back to my products"></Anchor>
              </Box>
            </>
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}
