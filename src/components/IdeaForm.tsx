import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

import { Idea } from '../apis/ideas';
import TextField from './TextField';
import Select from './Select';

export interface IdeaFormValues {
  content: string;
  impact: number;
  ease: number;
  confidence: number;
}

interface IdeaFormProps {
  idea?: Idea;
  onCreate?: (idea: IdeaFormValues) => Promise<void>;
  onReset: () => void;
  onUpdate?: (id: string, idea: IdeaFormValues) => Promise<void>;
}

const Form = styled.form`
  display: flex;
  & > *:nth-child(2),
  & > *:nth-child(3),
  & > *:nth-child(4),
  & > *:nth-child(6) {
    margin-left: 35px;
  }
`;

const Average = styled.div`
  margin-top: 10px;
  text-align: right;
  width: 65px;
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.primaryColor};
  outline: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Icon = styled.img``;

export default function IdeaForm(props: IdeaFormProps): JSX.Element {
  const { idea, onCreate, onReset, onUpdate } = props;

  const { content = '', impact = 10, ease = 10, confidence = 10 } = idea || {};
  const initialValues: IdeaFormValues = { content, impact, ease, confidence };

  const handleFormSubmit = async (values: IdeaFormValues) => {
    idea ? onUpdate && (await onUpdate(idea.id, values)) : onCreate && (await onCreate(values));
  };

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            name="content"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=""
            type="text"
            value={values.content}
            width="422px"
          />
          <Select name="impact" value={values.impact} />
          <Select name="ease" value={values.ease} />
          <Select name="confidence" value={values.confidence} />
          <Average>{Math.round((values.impact + values.ease + values.confidence) / 3)}</Average>
          <ButtonGroup>
            <Button disabled={isSubmitting} name="save" type="submit">
              <Icon src="/btn_ok.png" />
            </Button>
            <Button name="reset" onClick={onReset} type="reset">
              <Icon src="/btn_delete.png" />
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
}
