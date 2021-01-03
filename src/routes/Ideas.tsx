import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { createIdea, deleteIdea, getIdeas, Idea, updateIdea } from '../apis/ideas';
import IdeaForm, { IdeaFormValues } from '../components/IdeaForm';
import IdeaItem from '../components/IdeaItem';
import { useAuth } from '../context/auth-provider';

const IdeasStyled = styled.ul`
  margin-left: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  ::marker {
    color: ${({ theme }) => theme.text.color.bullet};
  }
`;

const Headers = styled.div`
  display: flex;
  margin-bottom: 30px;

  & > div:nth-child(1) {
    margin-left: 430px;
  }
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.text.fontSize.button};
  text-align: center;
  width: 100px;
`;

const BoldHeader = styled(Header)`
  font-weight: bolder;
`;

const GotIdeasGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 450px;
  margin-top: 246px;
`;

const BulbIcon = styled.img`
  display: flex;
  height: 100px;
  margin-bottom: 23px;
  margin-left: 12px;
  width: 70px;
`;

const GotIdeasText = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.text.fontSize.input};
  text-align: left;
`;

interface IdeasProps {
  onAddFormClose: () => void;
  showAddForm: boolean;
}

export default function Ideas(props: IdeasProps): JSX.Element {
  const { onAddFormClose, showAddForm } = props;

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [editedIdea, setEditedIdea] = useState<string | null>(null);
  const { tryGetValidToken } = useAuth();

  const handleCreateIdea = async (values: IdeaFormValues) => {
    try {
      await createIdea(values, tryGetValidToken);

      const retrievedIdeas = await getIdeas(tryGetValidToken);
      setIdeas(retrievedIdeas);
    } finally {
      onAddFormClose();
    }
  };

  const handleCancelCreate = () => {
    onAddFormClose();
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

  const showHeader = showAddForm || ideas.length > 0;

  return (
    <IdeasStyled>
      {showHeader && (
        <Headers>
          <Header>Impact</Header>
          <Header>Ease</Header>
          <Header>Confidence</Header>
          <BoldHeader>Avg.</BoldHeader>
        </Headers>
      )}
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
      {!showHeader && (
        <GotIdeasGroup>
          <BulbIcon src="/bulb.png" alt="bulb" />
          <GotIdeasText>Got Ideas?</GotIdeasText>
        </GotIdeasGroup>
      )}
    </IdeasStyled>
  );
}
