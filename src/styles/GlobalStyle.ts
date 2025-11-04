import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body, html, #root {
    font-family: 'Arial', sans-serif; 
    background-color: #f0f2f5; 
    color: #1c1c1c; 
    min-height: 100vh; 
  }

  button, a {
    cursor: pointer;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
  }
`;