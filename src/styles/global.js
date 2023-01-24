import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.svg';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    background: #000000;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    color: ${({ theme }) => theme.primary};
    position: relative;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
