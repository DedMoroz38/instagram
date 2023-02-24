import Dashboard from './components/Dashboard';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Theme/globalStyles";
import { useThemeContext } from './ContextProviders/ThemeContextProvider';

const App: React.FC<{}> = () => {
  const {themeMode} = useThemeContext();

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <Dashboard/>
    </ThemeProvider>
  );
}

export default App;
