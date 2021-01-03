import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LinkProps {
  href: string;
  children?: ReactNode;
  menu?: boolean;
}

const LinkStyled = styled.a`
  color: ${({ theme }) => theme.text.color.link};
  font-size: ${({ theme }) => theme.text.fontSize.primary};
  text-decoration: none;
`;

const MenuLinkStyled = styled(LinkStyled)`
  color: ${({ theme }) => theme.text.color.primary};
  opacity: 0.6;
`;

export default function Link(props: LinkProps): JSX.Element {
  const { href, children, menu } = props;
  return menu ? (
    <MenuLinkStyled href={href}> {children} </MenuLinkStyled>
  ) : (
    <LinkStyled href={href}> {children} </LinkStyled>
  );
}
