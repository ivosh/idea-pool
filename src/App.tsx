import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Menu from "./Menu";
import Signup from "./Signup";

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
    <>
      <AppRoot />
      <AppStyled>
        <Menu />
        <Signup />
      </AppStyled>
    </>
  );
}
