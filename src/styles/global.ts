import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html {
  font-size: 87.5%;
  @media (max-width: 768px) {
    font-size: 75%
  };
  @media (min-width: 1024) {
    font-size: 93.75%
  }
  @media (min-width: 1440px) {
    font-size: 100%
  }
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
  }
  body {
    background: ${({ theme }) => theme['gray-800']};
    color: ${({ theme }) => theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }`
