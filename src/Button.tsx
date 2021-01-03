import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  name: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const ButtonStyled = styled.button`
  ${({ theme }) => theme.text.button};

  background-color: ${({ theme }) => theme.background.secondaryColor};
  border: 0;
  height: 40px;
  text-transform: uppercase;
  width: 150px;
`;

export default function Button(props: ButtonProps): JSX.Element {
  const { disabled, children, name, onClick, type } = props;
  return (
    <ButtonStyled
      disabled={disabled}
      name={name}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </ButtonStyled>
  );
}
