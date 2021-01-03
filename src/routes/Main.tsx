import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { createIdea, deleteIdea, getIdeas, Idea, updateIdea } from '../apis/ideas';
import IdeaForm, { IdeaFormValues } from '../components/IdeaForm';
import IdeaItem from '../components/IdeaItem';
import { useAuth } from '../context/auth-provider';

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 78px;
  margin-right: 87px;
  margin-top: 41px;
  width: 100%;
`;

const Header = styled.div`
  border-bottom: 1px solid #d4d7d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 32px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.title};
  font-weight: normal;
  margin-left: 33px;
`;

const Icon = styled.img`
  border: 2px solid ${({ theme }) => theme.background.primaryColor};
  border-radius: 50%;

  &:hover {
    border: 2px solid gray;
  }
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.background.primaryColor};
  outline: 0;
`;

const List = styled.ul`
  margin-left: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
`;

export default function Main(): JSX.Element {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editedIdea, setEditedIdea] = useState<string | null>(null);
  const { tryGetValidToken } = useAuth();

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleCreateIdea = async (values: IdeaFormValues) => {
    try {
      await createIdea(values, tryGetValidToken);

      const retrievedIdeas = await getIdeas(tryGetValidToken);
      setIdeas(retrievedIdeas);
    } finally {
      setShowAddForm(false);
    }
  };

  const handleCancelCreate = () => {
    setShowAddForm(false);
  };

  const handleDeleteIdea = async (id: string) => {
    await deleteIdea(id, tryGetValidToken);
    setIdeas((items) => items.filter((item) => item.id !== id));
  };

  const handleEditIdea = (id: string) => {
    setEditedIdea(id);
  };

  const handleCancelEdit = () => {
    setEditedIdea(null);
  };

  const handleUpdateIdea = async (id: string, idea: IdeaFormValues) => {
    try {
      const updatedIdea = await updateIdea({ id, ...idea }, tryGetValidToken);
      setIdeas((items) => items.map((item) => (item.id === id ? updatedIdea : item)));
    } finally {
      setEditedIdea(null);
    }
  };

  useEffect(() => {
    const getIdeasFromAPI = async () => {
      const retrievedIdeas = await getIdeas(tryGetValidToken);
      setIdeas(retrievedIdeas);
    };

    getIdeasFromAPI();
  }, [tryGetValidToken]);

  return (
    <MainStyled>
      <Header>
        <Title>My Ideas</Title>
        <Button name="add" onClick={handleAdd}>
          <Icon src="/btn_plus.png" />
        </Button>
      </Header>
      <List>
        {showAddForm && (
          <ListItem key="new-idea">
            <IdeaForm onCreate={handleCreateIdea} onReset={handleCancelCreate} />
          </ListItem>
        )}
        {ideas.map((idea) => (
          <ListItem key={idea.id}>
            {editedIdea === idea.id ? (
              <IdeaForm idea={idea} onReset={handleCancelEdit} onUpdate={handleUpdateIdea} />
            ) : (
              <IdeaItem
                content={idea.content}
                impact={idea.impact}
                ease={idea.ease}
                confidence={idea.confidence}
                average_score={idea.average_score}
                onDelete={() => handleDeleteIdea(idea.id)}
                onEdit={() => handleEditIdea(idea.id)}
              />
            )}
          </ListItem>
        ))}
      </List>
    </MainStyled>
  );
}
