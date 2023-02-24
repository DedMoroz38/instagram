import styled, { createGlobalStyle} from "styled-components"
import {Theme} from './Themes';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: {theme: Theme}) => theme.background};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.3s linear;
  }
`;

export const Scrollbar = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`