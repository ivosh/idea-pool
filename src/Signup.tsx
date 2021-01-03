import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { createUser, CreateUserProps } from './apis/users';
import Button from './components/Button';
import TextField from './components/TextField';
import { useAuth } from './context/auth-context';

const SignUpStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 280px;
  padding-top: 217px;
  width: 458px;
`;

const Heading = styled.h1`
  ${({ theme }) => theme.text.heading};
  font-weight: normal;
  text-align: center;
`;

const Form = styled.form`
  & > * {
    margin-bottom: 43px;
  }
`;

const SignUpOrLogin = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default function SignUp(): JSX.Element {
  const { isAuthenticated, login } = useAuth();

  const onSubmit = async (values: CreateUserProps): Promise<void> => {
    await createUser(values);
    await login(values);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <SignUpStyled>
      <Heading>Sign Up</Heading>
      <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Name"
              value={values.name}
            />
            <TextField
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              type="email"
              value={values.email}
            />
            <TextField
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              type="password"
              value={values.password}
            />
            <SignUpOrLogin>
              <Button disabled={isSubmitting} name="signup" type="submit">
                Sign Up
              </Button>
              <div>Already have an account? Log in</div>
            </SignUpOrLogin>
          </Form>
        )}
      </Formik>
    </SignUpStyled>
  );
}
