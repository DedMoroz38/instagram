import { createGlobalStyle} from "styled-components"
import {Theme} from './Themes';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: {theme: Theme}) => theme.background};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.3s linear;
  }
`;