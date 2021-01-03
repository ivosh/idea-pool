import React from 'react';
import Gravatar from 'react-awesome-gravatar';
import styled from 'styled-components';
import Link from '../components/Link';

import { useAuth } from '../context/auth-provider';

const MenuStyled = styled.div`
  background-color: ${({ theme }) => theme.background.secondaryColor};
  text-align: center;
  width: 200px;
`;

const Icon = styled.img`
  border-radius: 50%;
  margin-top: 37px;
`;

const Separator = styled.hr`
  color: #33b968;
  height: 1px;
  border: 0;
  border-bottom: 1px solid;
  margin-left: 27px;
  margin-right: 27px;
  margin-top: 37px;
`;

const IconText = styled.div`
  color: ${({ theme }) => theme.text.color.secondary};
  font-size: ${({ theme }) => theme.text.fontSize.primary};
  margin-top: 13px;
`;

const UserInfo = styled.div`
  color: ${({ theme }) => theme.text.color.secondary};
  font-size: ${({ theme }) => theme.text.fontSize.input};
  margin-top: 6px;
  margin-bottom: 9px;
`;

export default function Menu(): JSX.Element {
  const { accessToken, isAuthenticated } = useAuth();

  return (
    <MenuStyled>
      <Icon src="/IdeaPool_icon.png" alt="Idea Pool" />
      <IconText>The Idea Pool</IconText>
      {isAuthenticated && (
        <>
          <Separator />
          <Gravatar email={accessToken?.email || ''} options={{ size: 64 }}>
            {(url) => <Icon src={url} />}
          </Gravatar>
          <UserInfo>{accessToken?.name}</UserInfo>
          <Link href="/logout" menu>
            Log out
          </Link>
        </>
      )}
    </MenuStyled>
  );
}
