import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { darkTheme, lightTheme } from "../components/Theme/Themes";
import {Theme} from '../components/Theme/Themes';

type ThemeContext = {
  themeToggler: () => void,
  theme: 'light' | 'dark',
  themeMode: Theme
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const useThemeContext = () => {
  const currentThemeContext = useContext(ThemeContext);

  if (!currentThemeContext) {
    throw new Error(
      "ErrorPopUpContext is null!"
    );
  }

  return currentThemeContext;
};

const ThemeContextProvider: React.FC<{
  children: JSX.Element
}> = ({children}) => {
  const {theme, themeToggler, mountedComponent} = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{
      themeToggler,
      theme,
      themeMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;