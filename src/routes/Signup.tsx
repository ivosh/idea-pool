import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { createUser, CreateUserProps } from '../apis/users';
import Button from '../components/Button';
import Link from '../components/Link';
import TextField from '../components/TextField';
import { useAuth } from '../context/auth-provider';

const SignupStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 280px;
  padding-top: 217px;
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

const SignupOrLogin = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default function Signup(): JSX.Element {
  const { isAuthenticated, login } = useAuth();

  const onSubmit = async (values: CreateUserProps): Promise<void> => {
    await createUser(values);
    await login(values);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <SignupStyled>
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
              width="100%"
            />
            <TextField
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              type="email"
              value={values.email}
              width="100%"
            />
            <TextField
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              type="password"
              value={values.password}
              width="100%"
            />
            <SignupOrLogin>
              <Button disabled={isSubmitting} name="signup" type="submit">
                Sign Up
              </Button>
              <div>
                Already have an account? <Link href="/login">Log in</Link>
              </div>
            </SignupOrLogin>
          </Form>
        )}
      </Formik>
    </SignupStyled>
  );
}
