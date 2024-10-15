import React, { useState, useEffect } from 'react';
import { 
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper
} from '@mui/material';
import LoadingAnimation from '../common/LoadingAnimation';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface LPJHistoryItem {
    id: number;
    no_request: string;
    tgl_lpj: string;
    file_path: string;
    created_at: string;
}
  
const History: React.FC = () => {
    const [history, setHistory] = useState<LPJHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`${API_URL}/lpj-history`);
          console.log('API Response:', response.data);

          if (Array.isArray(response.data)) {
            setHistory(response.data);
          } else if (typeof response.data === 'object' && response.data !== null) {
            const possibleArrays = Object.values(response.data).filter(Array.isArray);
            if (possibleArrays.length > 0){
                setHistory(possibleArrays[0] as LPJHistoryItem[]);
            } else {
                throw new Error('No array found in the response');
            }
          } else {
            throw new Error(`Unexpected data structure: ${typeof response.data}`);
          }
        } catch (error) {
            console.error('Error fetching LPJ history:', error);
            if(axios.isAxiosError(error)){
                setError(`Failed to load LPJ history. Server responded with: ${error.response?.status} ${error.response?.statusText}`);
            } else {
                setError('Failed to load LPJ history.');
            }
        } finally {
          setLoading(false);
        }
      };
  
      fetchHistory();
    }, []);
  
    if (loading) {
      return <LoadingAnimation message='Loading LPJ history' />;
    }
  
    if (error) {
      return (
        <Typography color="error">
            {error}
        </Typography>
      )
    }
  
    if (history.length === 0) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>No. Request</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography display="flex" justifyContent="center" alignItems="center" sx={{marginInline:'auto', marginBlock:2}}> No Data History </Typography>
                </TableCell>
              </TableRow>
             </TableBody>
          </Table>
        </TableContainer>
      )
    }
  
    return (
      <> 
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>No. Request</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.no_request}</TableCell>
                  <TableCell>{new Date(item.tgl_lpj).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> 
        </TableContainer>
      </>
    );
  };
  
  export default History;