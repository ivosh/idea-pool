import React from "react";
import { Formik } from "formik";
import styled from "styled-components";

import Button from "./Button";
import TextField from "./TextField";

const SignupStyled = styled.div`
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

const SignupOrLogin = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export default function Signup(): JSX.Element {
  return (
    <SignupStyled>
      <Heading>Sign Up</Heading>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={() => {}}
      >
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
            <SignupOrLogin>
              <Button disabled={!isSubmitting} name="signup" type="submit">
                Sign Up
              </Button>
              <div>Already have an account? Log in</div>
            </SignupOrLogin>
          </Form>
        )}
      </Formik>
    </SignupStyled>
  );
}
