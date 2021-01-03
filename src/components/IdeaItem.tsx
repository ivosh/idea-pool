import React from 'react';
import styled from 'styled-components';

interface IdeaItemProps {
  content: string;
  impact: number;
  ease: number;
  confidence: number;
  average_score: number;
  onDelete: () => Promise<void>;
  onEdit: () => void;
}

const IdeaItemStyled = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-right: -32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 422px;
`;

const Number = styled.div`
  text-align: right;
  width: 100px;
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.primaryColor};
  outline: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 35px;
`;

const Icon = styled.img``;

export default function IdeaItem(props: IdeaItemProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { content, impact, ease, confidence, average_score, onDelete, onEdit } = props;

  return (
    <IdeaItemStyled>
      <Content>{content}</Content>
      <Number>{impact}</Number>
      <Number>{ease}</Number>
      <Number>{confidence}</Number>
      <Number>{Math.round(average_score)}</Number>
      <ButtonGroup>
        <Button name="edit" onClick={onEdit} type="button">
          <Icon src="/btn_pen.png" />
        </Button>
        <Button name="delete" onClick={onDelete} type="button">
          <Icon src="/btn_bin.png" />
        </Button>
      </ButtonGroup>
    </IdeaItemStyled>
  );
}
