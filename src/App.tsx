import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { AuthProvider } from './context/auth-provider';
import Menu from './routes/Menu';
import Routes from './routes/Routes';

const AppRoot = createGlobalStyle`
  * {
    font-family: sans-serif !important;
  }
`;

const AppStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 1024px;
  width: 1280px;
`;

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppRoot />
      <AppStyled>
        <Menu />
        <Router>
          <Routes />
        </Router>
      </AppStyled>
    </AuthProvider>
  );
}
