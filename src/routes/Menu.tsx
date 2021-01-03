import React from 'react';
import styled from 'styled-components';

const MenuStyled = styled.div`
  background-color: ${({ theme }) => theme.background.secondaryColor};
  text-align: center;
  width: 200px;
`;

const Icon = styled.img`
  margin-top: 37px;
`;

const IconText = styled.div`
  color: ${({ theme }) => theme.text.color.secondary};
  font-size: ${({ theme }) => theme.text.fontSize.primary};
  margin-top: 13px;
`;

export default function Menu(): JSX.Element {
  return (
    <MenuStyled>
      <Icon src="/IdeaPool_icon.png" alt="Idea Pool" />
      <IconText>The Idea Pool</IconText>
    </MenuStyled>
  );
}
