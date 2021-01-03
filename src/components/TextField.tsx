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
  ${({ theme }) => theme.text.textField.primary};

  background: ${({ theme }) => theme.background.primaryColor};
  border: 0;
  border-bottom: 1px solid #455e70;
  display: block;
  line-height: 22px;
  padding-bottom: 12px;
  padding-top: 12px;
  width: 100%;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    ${({ theme }) => theme.text.textField.placeholder};
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
