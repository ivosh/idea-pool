import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LinkProps {
  href: string;
  children?: ReactNode;
}

const LinkStyled = styled.a`
  color: ${({ theme }) => theme.text.color.link};
  font-size: ${({ theme }) => theme.text.fontSize.primary};
  text-decoration: none;
`;

export default function Link(props: LinkProps): JSX.Element {
  const { href, children } = props;
  return <LinkStyled href={href}>{children}</LinkStyled>;
}
