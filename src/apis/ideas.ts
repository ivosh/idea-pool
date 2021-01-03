import axios from 'axios';
import { TryGetValidToken, url } from '../types';

export interface Idea {
  id: string;
  content: string;
  impact: number;
  ease: number;
  confidence: number;
  average_score: number;
  created_at: number;
}

export const getIdeas = async (tryGetValidToken: TryGetValidToken): Promise<Idea[]> => {
  const tokens = await tryGetValidToken();

  const response = await axios.get<Idea[]>(`${url}/ideas`, {
    headers: {
      'X-Access-Token': tokens?.accessToken,
    },
  });

  return response.data;
};

interface CreateIdea {
  content: string;
  impact: number;
  ease: number;
  confidence: number;
}

export const createIdea = async (
  idea: CreateIdea,
  tryGetValidToken: TryGetValidToken
): Promise<Idea> => {
  const tokens = await tryGetValidToken();

  const response = await axios.post<Idea>(`${url}/ideas`, idea, {
    headers: {
      'X-Access-Token': tokens?.accessToken,
    },
  });

  return response.data;
};

export const deleteIdea = async (id: string, tryGetValidToken: TryGetValidToken): Promise<void> => {
  const tokens = await tryGetValidToken();

  await axios.delete<Idea>(`${url}/ideas/${id}`, {
    headers: {
      'X-Access-Token': tokens?.accessToken,
    },
  });
};

interface UpdateIdea {
  id: string;
  content: string;
  impact: number;
  ease: number;
  confidence: number;
}

export const updateIdea = async (
  idea: UpdateIdea,
  tryGetValidToken: TryGetValidToken
): Promise<Idea> => {
  const tokens = await tryGetValidToken();
  const { id, ...rest } = idea;

  const response = await axios.put<Idea>(`${url}/ideas/${id}`, rest, {
    headers: {
      'X-Access-Token': tokens?.accessToken,
    },
  });

  return response.data;
};
