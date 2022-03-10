import { Box, TextInput, Button } from 'grommet';
import styled from 'styled-components/macro';

export const Wrapper = styled(Box)`
  /*background: radial-gradient(
    calc(10px + 430vmin) calc(10px + 300vmin) at 100% -50%,
    #ffffff 49%,
    #004a29 50%
  );*/
  background-color: white;
  background-repeat: no-repeat;
  height: 100vh;
`;
export const StyledTextInput = styled(TextInput)`
  ::placeholder {
    color: black;
    opacity: 1;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 12px;
`;
export const StyledH3 = styled.h3`
  color: #e84118;
`;
