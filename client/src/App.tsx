import Dashboard from './components/Dashboard';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Theme/globalStyles";
import { lightTheme, darkTheme } from "./components/Theme/Themes";
import  {useDarkMode} from "./hooks/useDarkMode";
import React from 'react';

export const ThemeContext = React.createContext<any>(null);

const App: React.FC<{}> = () => {
  const {theme, themeToggler, mountedComponent} = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{
      themeToggler,
      theme
    }}>
      <ThemeProvider theme={themeMode}>
          <GlobalStyles/>
          <Dashboard/>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
