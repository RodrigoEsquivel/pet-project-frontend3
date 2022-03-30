import { Box, Card, CardHeader, CardBody, CardFooter, Image } from 'grommet';

export function Product(props:any) {
    return (
      <Card width="small" align="center" background="accent-2" height="small">
        <CardHeader>{"Name: " + props.name} { "Brand: " + props.brand}</CardHeader>
        <CardBody>
          <Box height="medium" width="xsmall" justify="center">
            <Image fit="contain" src={props.imageURI}/>
          </Box>
        </CardBody>
        <CardFooter>{"$"+props.price}{props.description}</CardFooter>
      </Card>
    );
  }