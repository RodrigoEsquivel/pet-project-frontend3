import { Box, TextInput, Button } from 'grommet';
import styled from 'styled-components/macro';

export const Wrapper = styled(Box)`
  background-repeat: repeat;
  height: 100vh;
`;
export const StyledTextInput = styled(TextInput)`
  background-color: #d1ccc0;
  outline: 1px solid;
  outline-color: #84817a;
  ::placeholder {
    color: black;
    opacity: 1;
  }
  &:focus {
    box-shadow: 0 0 2px 2px #84817a;
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
  color: #FF4040;
`;
