import { Box, TextInput, Button } from 'grommet';
import styled from 'styled-components/macro';

export const Wrapper = styled(Box)`
  background-repeat: repeat;
  height: 100vh;
`;
export const StyledTextInput = styled(TextInput)`
  ::placeholder {
    color: black;
    opacity: 1;
  }
`;

export const ImageURITextInput = styled(StyledTextInput)`
  ::placeholder {
    font-size: 12px;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 12px;
`;
export const StyledH3 = styled.h3`
  color: #e84118;
`;
