import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import Link from '../components/Link';
import TextField from '../components/TextField';
import { useAuth } from '../context/auth-provider';
import { UserLoginProps } from '../apis/accessTokens';

const LogInStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 267px;
  padding-top: 235px;
  width: 485px;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.text.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.heading};
  font-weight: normal;
  text-align: center;
`;

const Form = styled.form`
  & > * {
    margin-bottom: 43px;
  }
`;

const LoginOrSignup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default function Login(): JSX.Element {
  const { isAuthenticated, login } = useAuth();

  const onSubmit = async (values: UserLoginProps): Promise<void> => login(values);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <LogInStyled>
      <Heading>Log In</Heading>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
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
            <LoginOrSignup>
              <Button disabled={isSubmitting} name="login" type="submit">
                Log In
              </Button>
              <div>
                Don&apos;t have an account? <Link href="/signup">Create an account</Link>
              </div>
            </LoginOrSignup>
          </Form>
        )}
      </Formik>
    </LogInStyled>
  );
}
