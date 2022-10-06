import Dashboard from './components/Dashboard';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Theme/globalStyles";
import { lightTheme, darkTheme } from "./components/Theme/Themes";
import  {useDarkMode} from "./hooks/useDarkMode";
import React, { useState } from 'react';

export const ThemeContext = React.createContext<any>(null);
export const ErrorPopUpContext = React.createContext<any>(null);

const App: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {theme, themeToggler, mountedComponent} = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ErrorPopUpContext.Provider value={{
      isOpen,
      setIsOpen,
      errorMessage,
      setErrorMessage
    }}>
      <ThemeContext.Provider value={{
        themeToggler,
        theme,
        themeMode
      }}>
        <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <Dashboard/>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ErrorPopUpContext.Provider>
  );
}

export default App;
