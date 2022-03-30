import {
  Box,
  ResponsiveContext,
  Image,
  Heading,
  Header,
  Text,
  Anchor,
} from 'grommet';
import {
  Wrapper,
  StyledButton,
  StyledH3,
} from '../../components/CommonComponents';
import logo from '../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useSellerSlice } from './slice';
import { selectProducts, selectError } from './slice/selectors';
import { Product } from '../../components/Product';
import {useAuth} from '../../utils/useAuth';
import { useNavigate } from 'react-router';
 
export function SellerPage() {
  const dispatch = useDispatch();
  const { actions } = useSellerSlice();
  const error = useSelector(selectError);
  const auth = useAuth();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const LogOutOnClick = () => {
    auth?.signOut();
  }
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
            <Heading level={size==="small"?"3":"1"}> My products </Heading>
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
              {products.length!==0?products.map((product:any) => (<Product 
              name={product['name']} 
              imageURI={product['imageURI']} 
              description={product['description']} 
              brand={product['brand']} 
              price={product['price']}/>)):<Text>You don't have products on sale, add a product for it to appear here</Text>}
          </Box>
            <>
              <Box justify="center" align="center" width="xlarge" pad="xsmall" >
                <Box align="end" gap="none" margin="medium" pad="none">
                    {error && <StyledH3>Error while loading products</StyledH3>}
                </Box>
                <Anchor onClick={()=> navigate('/CreateProduct')}  label="Add a product"></Anchor>
                <Anchor onClick={()=> navigate('/Buyer')}  label="Browse products on sale"></Anchor>
                <Anchor onClick={()=> navigate('/ModifyAccount')}  label="Modify my account"></Anchor>
              </Box>
            </>
          </Box>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  );
}