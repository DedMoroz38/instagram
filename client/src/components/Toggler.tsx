import styled from "styled-components";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from "../ContextProviders/ThemeContextProvider";

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

const Toggle: React.FC = () => {
  const { themeToggler, theme } = useThemeContext();

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