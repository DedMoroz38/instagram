import React, { useContext, useState } from 'react';
import styled from "styled-components";
import Switch from '@mui/material/Switch';
import togglerSun from '../images/togglerSun.svg';
import togglerMoon from '../images/togglerMoon.svg';
import { ThemeContext } from '../App';


const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;
const ModeIcon = styled.img`
  width: 25px;
  height: 25px;
  filter: ${({ theme }) => theme.filter};
`;

interface ToggleInterface{
}

const Toggle: React.FC<ToggleInterface> = () => {
  const { themeToggler, theme } = useContext(ThemeContext);
  return (
      <Button onClick={themeToggler} >
        <ModeIcon src={theme === 'light' ? togglerSun : togglerMoon} alt='sun'/>
      </Button>
  );
};
export default Toggle;