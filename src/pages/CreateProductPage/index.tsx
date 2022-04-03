import {
  Box,
  ResponsiveContext,
  Form,
  FormField,
  Image,
  Heading,
  Header,
  Text,
  Anchor,
} from 'grommet';
import {
  Wrapper,
  StyledTextInput,
  StyledButton,
  StyledH3,
  ImageURITextInput
} from '../../components/CommonComponents';
import React from 'react';
import logo from '../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateProductSlice } from './slice';
import {
  selectDescription,
  selectError,
  selectBrand,
  selectName,
  selectPrice,
  selectProductCreated,
  selectImageURI,
} from './slice/selectors';
import {useAuth} from '../../utils/useAuth';
import { useNavigate } from "react-router-dom";
  
export function CreateProductPage() {
  const dispatch = useDispatch();
  const { actions } = useCreateProductSlice();
  const auth = useAuth();
  const error = useSelector(selectError);
  const name = useSelector(selectName);
  const description = useSelector(selectDescription);
  const brand = useSelector(selectBrand);
  const imageURI = useSelector(selectImageURI);
  const navigate = useNavigate();
  const price = useSelector(selectPrice);
  const productCreated = useSelector(selectProductCreated);
  const LogOutOnClick = () => {
      auth?.signOut();
    } 
  const onSubmit = () => {
    if (
      description &&
      name &&
      brand &&
      imageURI &&
      price
    ) {
      dispatch(actions.fetchingData());
    }
  };
  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setName(evt.currentTarget.value));
  };
  const onChangeDescription= (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setDescription(evt.currentTarget.value));
  };
  const onChangeBrand = (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setBrand(evt.currentTarget.value));     
  };
  const onChangePrice= (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setPrice(evt.currentTarget.value));
  };
  const onChangeImageURI = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setImageURI(evt.currentTarget.value));
  };
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Wrapper overflow="auto">
          <Header
            background={{ color: '#f7f1e3', opacity: 'medium' }}
            align="center"
            justify="center"
          >
            <Heading level={size==="small"?"3":"1"}> Upload a product for sale </Heading>
            <Box
              direction="row-responsive"
              height={size==="small"?"xxsmall":"xsmall"}
              width={size==="small"?"xsmall":"medium"}
              justify="center"
              pad={'small'}
            >
              <Image src={logo}></Image>
            </Box>
            <StyledButton size="small" href="/login" onClick={LogOutOnClick} color="#d1ccc0"  secondary label="Log Out"/>       
          </Header>
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
              <Box justify="center" align="center" width="xlarge" pad="xsmall">
                <Form onSubmit={onSubmit}>
                  <Box direction="row" gap="none" pad="xsmall">
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeName}
                        textAlign="center"
                        placeholder="Name"
                      ></StyledTextInput>
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeDescription}
                        textAlign="center"
                        placeholder="Description"
                      ></StyledTextInput>
                    </FormField>
                  </Box>
                  <Box direction="row" pad="xsmall" gap="none">
                    <FormField>
                      {size==="small"?
                        <ImageURITextInput
                          onChange={onChangeImageURI}
                          textAlign="center"
                          placeholder="Link to the image"
                        ></ImageURITextInput>:
                        <StyledTextInput
                          onChange={onChangeImageURI}
                          textAlign="center"
                          placeholder="Link to the image"
                        ></StyledTextInput>
                      }                    
                    </FormField>
                    <FormField>
                      <StyledTextInput
                        onChange={onChangeBrand}
                        textAlign="center"
                        placeholder="Brand"
                      ></StyledTextInput>
                    </FormField>
                  </Box>
                  <Box margin={{ horizontal: 'xlarge', bottom: 'small' }}>
                    <StyledTextInput
                      onChange={onChangePrice}
                      textAlign="center"
                      placeholder="Price"
                    ></StyledTextInput>
                  </Box>
                  <Box margin={{ vertical: 'medium' }} align="center">
                    <StyledButton
                      type="submit"
                      label="Upload product"
                      size={'medium'}
                      color="#aaa69d"
                      disabled={
                        !(
                          description &&
                          name &&
                          brand &&
                          price &&
                          imageURI
                        )
                      }
                      primary
                    />
                    <Box>
                      {error && (
                        <StyledH3>Error in the product creation</StyledH3>
                      )}
                    </Box>
                    <Box>
                      {!(
                        description &&
                        name &&
                        brand &&
                        price &&
                        imageURI
                      ) && <StyledH3>Data is not complete</StyledH3>}
                    </Box>
                    <Box>
                      {productCreated && (
                        <Text weight="bold" color="#7de83f">
                          Product created
                        </Text>
                      )}
                    </Box>
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