import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ThemeProvider theme={ theme }>
      <PlanetsProvider>
        <GlobalStyle />
        <App />
      </PlanetsProvider>
    </ThemeProvider>,
  );
