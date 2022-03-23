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
  import { useCreateProductSlice } from './slice';
  import {
    selectDescription,
    selectError,
    selectBrand,
    selectName,
    selectIsFetching,
    selectPrice,
    selectProductCreated,
    selectImageURI,
  } from './slice/selectors';
  import { useNavigate } from 'react-router';
  
  interface Props {}
  
  export function CreateProductPage(props: Props) {
    const dispatch = useDispatch();
    const { actions } = useCreateProductSlice();
    const error = useSelector(selectError);
    const name = useSelector(selectName);
    const description = useSelector(selectDescription);
    const brand = useSelector(selectBrand);
    const imageURI = useSelector(selectImageURI);
    const price = useSelector(selectPrice);
    const productCreated = useSelector(selectProductCreated);
    const navigate = useNavigate();
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
 /* useEffect(() => {
      setTimeout(() => {
        if (productCreated) {
          navigate('/login');
        }
      }, 3000);
    }, [productCreated, navigate]);*/
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Wrapper overflow="auto">
            <Header
              background={{ color: 'accent-3', opacity: 'medium' }}
              align="center"
              justify="center"
            >
              <Heading> Upload a product for sale </Heading>
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
                          onChange={onChangeDescription}
                          textAlign="center"
                          placeholder="Description"
                          size={''}
                        ></StyledTextInput>
                      </FormField>
                    </Box>
  
                    <Box direction="row" pad="xsmall" gap="none">
                      <FormField>
                        <StyledTextInput
                          onChange={onChangeImageURI}
                          textAlign="center"
                          placeholder="Link to the image"
                          size={''}
                        ></StyledTextInput>
                      </FormField>
                      <FormField>
                        <StyledTextInput
                          onChange={onChangeBrand}
                          textAlign="center"
                          placeholder="Brand"
                          size={''}
                        ></StyledTextInput>
                      </FormField>
                    </Box>
                    <Box margin={{ horizontal: 'xlarge', bottom: 'small' }}>
                      <StyledTextInput
                        onChange={onChangePrice}
                        textAlign="center"
                        placeholder="Price"
                        size={''}
                      ></StyledTextInput>
                    </Box>
                    <Box align="center">
                    </Box>
                    <Box margin={{ vertical: 'medium' }} align="center">
                      <StyledButton
                        type="submit"
                        label="Upload product"
                        size={'medium'}
                        color="#5D8BF4"
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
                  <Anchor href="/login" label="Back to login"></Anchor>
                </Box>
              </>
            </Box>
          </Wrapper>
        )}
      </ResponsiveContext.Consumer>
    );
  }
  