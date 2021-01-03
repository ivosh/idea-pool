import React, { useState } from 'react';
import styled from 'styled-components';

import Ideas from './Ideas';

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 78px;
  margin-right: 87px;
  margin-top: 41px;
  width: 100%;
`;

const Header = styled.div`
  border-bottom: 1px solid #d4d7d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 32px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.title};
  font-weight: normal;
  margin-left: 33px;
`;

const Icon = styled.img`
  border: 2px solid ${({ theme }) => theme.background.primaryColor};
  border-radius: 50%;

  &:hover {
    border: 2px solid gray;
  }
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.primaryColor};
  outline: 0;
`;

export default function Main(): JSX.Element {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleAddFormClose = () => {
    setShowAddForm(false);
  };

  return (
    <MainStyled>
      <Header>
        <Title>My Ideas</Title>
        <Button name="add" onClick={handleAdd}>
          <Icon src="/btn_plus.png" />
        </Button>
      </Header>
      <Ideas onAddFormClose={handleAddFormClose} showAddForm={showAddForm} />
    </MainStyled>
  );
}
