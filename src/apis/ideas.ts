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
