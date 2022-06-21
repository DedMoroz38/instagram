import { createGlobalStyle} from "styled-components"
import {Theme} from './Themes';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: {theme: Theme}) => theme.background};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.30s linear;
  }
`;