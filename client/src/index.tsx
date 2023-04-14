import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import ClienErrorHandlingProvider from './ContextProviders/ClienErrorHandlingProvider';
import ThemeContextProvider from './ContextProviders/ThemeContextProvider';
import WidthProvider from './ContextProviders/WidthProivder';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
        <ClienErrorHandlingProvider>
          <ThemeContextProvider>
            <WidthProvider>
              <App />
            </WidthProvider>
          </ThemeContextProvider>
        </ClienErrorHandlingProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);

