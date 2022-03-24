/**
 *
 * SignUpPage
 *
 */
 import {
    Box,
    ResponsiveContext,
    Image,
    Heading,
    Header,
    Anchor,
  } from 'grommet';
  import {
    Wrapper,
    StyledButton,
    StyledH3,
  } from '../../components/CommonComponents';
  import logo from '../img/logo.png';
  import { useDispatch, useSelector } from 'react-redux';
  import { useBuyerSlice } from './slice';
  import {
    selectProducts,
    selectError,
  } from './slice/selectors';
  import { Product } from '../../components/Product';
  import {useAuth} from '../../utils/useAuth';
  import { useNavigate } from "react-router-dom";
  
  interface Props {}
  
  export function BuyerPage(props: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    const { actions } = useBuyerSlice();
    const error = useSelector(selectError);
    const products = useSelector(selectProducts);
    const LogOutOnClick = () => {
      auth?.signOut();
    }
    
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
          <Wrapper overflow="auto" background={{ color: 'accent-3', opacity: 'medium' }}>
            <Header
              background={{ color: 'accent-3', opacity: 'medium' }}
              align="center"
              justify="center"
              onLoad={()=>dispatch(actions.fetchingData())}
            >
              <Heading level={size==="small"?"3":"1"}> Products for sale </Heading>
              <Box
                direction="row-responsive"
                height={size==="small"?"xxsmall":"xsmall"}
                width={size==="small"?"xsmall":"medium"}
                justify="stretch"
                pad={'small'}
              >
                <Image src={logo}></Image>
              </Box>
              <StyledButton href="/login" color="#5D8BF4" secondary label="Log Out" onClick={LogOutOnClick}/>
            </Header>
            <Box
              responsive={true}
              fill="vertical"
              align="center"
              pad="xlarge"
              gap="large"
              justify="evenly"
            >
            <Box direction={size==="small"?"column":"row-responsive"} gap="medium" pad="medium" >
                {products.map((product:any) => (<Product 
                name={product['name']} 
                imageURI={product['imageURI']} 
                description={product['description']} 
                brand={product['brand']} 
                price={product['price']}/>))}
            </Box>
              <>
                <Box justify="center" align="center" width="xlarge" pad="xsmall" >
                  <Box align="end" gap="none" margin="medium" pad="none">
                      {error && <StyledH3>Error while loading products</StyledH3>}
                  </Box>
                  <Anchor label="Add a product" onClick={()=> navigate('/CreateProduct')}></Anchor>
                  <Anchor label="Browse your products" onClick={()=> navigate('/Seller')}></Anchor>
                </Box>
              </>
            </Box>
          </Wrapper>
        )}
      </ResponsiveContext.Consumer>
    );
  }
  