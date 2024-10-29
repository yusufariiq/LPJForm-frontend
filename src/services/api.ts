import axios from 'axios';
import { LPJHistoryItem, FormValues } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchLPJHistory = async (): Promise<LPJHistoryItem[]> => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export const generateLPJ = async (formData: FormValues): Promise<Blob> => {
  const response = await axios.post(`${API_URL}/generate-lpj`, formData, {
    responseType: 'blob',
  });
  return response.data;
};

export const handleDownload = async (filename: string) => {
  try{
    const response = await axios.get(`${API_URL}/history/${filename}`, {
      responseType: 'blob',
    });

    console.log('Response received:', {
      size: response.data.size,
      type: response.data.type
    });

    if (response.data.size === 0) {
      throw new Error('File is empty');
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading attachment:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
  }
}