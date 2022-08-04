import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { ThemeContext } from '../App';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';

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

interface ToggleInterface{
}

const Toggle: React.FC<ToggleInterface> = () => {
  const { themeToggler, theme } = useContext(ThemeContext);
  return (
      <Button onClick={themeToggler} >
        {
          theme === 'light' ? 
          <LightModeIcon style={{color: 'black'}} /> :
          <BedtimeIcon style={{color: 'white'}} /> 
        }
      </Button>
  );
};
export default Toggle;