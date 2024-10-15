import axios from 'axios';
import { LPJHistoryItem, FormValues } from '../types';

const API_URL = 'http://localhost:5002/api';

export const fetchLPJHistory = async (): Promise<LPJHistoryItem[]> => {
  const response = await axios.get(`${API_URL}/lpj-history`);
  return response.data;
};

export const generateLPJ = async (formData: FormValues): Promise<Blob> => {
  const response = await axios.post(`${API_URL}/generate-lpj`, formData, {
    responseType: 'blob',
  });
  return response.data;
};