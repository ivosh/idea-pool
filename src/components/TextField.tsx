import React from 'react';
import { FormikHandlers } from 'formik';
import styled from 'styled-components';

interface TextFieldProps {
  name: string;
  onBlur?: FormikHandlers['handleBlur'];
  onChange?: FormikHandlers['handleChange'];
  placeholder: string;
  type?: string;
  value?: string;
}

const TextFieldStyled = styled.input`
  background: ${({ theme }) => theme.background.primaryColor};
  border: 0;
  border-bottom: 1px solid #455e70;
  color: ${({ theme }) => theme.text.color.primary};
  display: block;
  font-size: ${({ theme }) => theme.text.fontSize.input};
  line-height: 22px;
  padding-bottom: 12px;
  padding-top: 12px;
  width: 100%;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    font-size: ${({ theme }) => theme.text.fontSize.primary};
    opacity: 0.6;
  }
`;

export default function TextField(props: TextFieldProps): JSX.Element {
  const { name, onBlur, onChange, placeholder, type, value } = props;
  return (
    <TextFieldStyled
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type || 'text'}
      value={value}
    />
  );
}
