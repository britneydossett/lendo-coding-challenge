import { createGlobalStyle } from "styled-components";

// Added to get rid of margins set by styled components on the body
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default GlobalStyle;
