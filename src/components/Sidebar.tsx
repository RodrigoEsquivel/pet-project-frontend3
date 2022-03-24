import { Box, Button, Nav, Text } from 'grommet';
    
    const SidebarNav = () => {

      return (
        <Box fill="vertical" direction="row" border="all">
          <Nav background="brand">
              <Button label={<Text color="white">My Products</Text>}></Button>
              <Button label={<Text color="white">All Products</Text>}></Button>
              <Button label={<Text color="white">Log out</Text>}></Button>
          </Nav>
        </Box>
      );
    };
    
export const Sidebar = () => <SidebarNav />;
    