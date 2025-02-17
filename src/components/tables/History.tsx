import React, { useState, useEffect} from 'react';
import { 
    Box,
    Button,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import LoadingAnimation from '../common/LoadingAnimation';
import axios from 'axios';
import dayjs from 'dayjs';
import { handleDownload } from '../../services/api';
import { LPJHistoryItem } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;
  
const History: React.FC = () => {
    const [history, setHistory] = useState<LPJHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`${API_URL}/history`);
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
  
    const columns: GridColDef[] = [
      { 
        field: 'numbering', 
        headerName: 'No', 
        width: 70,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { 
        field: 'action', 
        headerName: 'Action', 
        width: 100,
        renderCell: (params) => (
          <>
            {params.row.filename && (
              <Button
                onClick={() => handleDownload(params.row.filename)}
                title='Download attachment'
              >
                <DownloadIcon />
              </Button>
            )}
          </>
        )
      },
      { field: 'no_request', headerName: 'No. Request', width: 200 },
      { field: 'filename', headerName: 'File Name', width: 400 },
      { 
        field: 'tgl_lpj', 
        headerName: 'Date', 
        width: 250,
        valueGetter: (params) => {
          const date = dayjs(params);
          return date.isValid() ? date.format('DD/MM/YYYY') : 'Invalid Date';
        }
      },
      { 
        field: 'created_at', 
        headerName: 'Created At', 
        width: 250,
        valueGetter: (params) => {
          const date = dayjs(params);
          return date.isValid() ? date.format('DD/MM/YYYY HH:mm:ss') : 'Invalid Date';
        }
      },
  ];
 
  function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{p:1}}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
  }

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
  
    return (
      <> 
        <Container>
          <Box sx={{mb:2}}>
            <Typography variant="h4" component="h5">
              LPJ History
            </Typography>
          </Box>
          <Paper variant='outlined' sx={{padding:'20px'}} >
            <DataGrid
              rows={history}
              columns={columns}
              getRowId={(row) => row.id}
              slots={{
                toolbar: CustomToolbar
              }}
              initialState={{
                pagination: {
                  paginationModel: {page: 0, pageSize: 10},
                },
              }}
              pageSizeOptions={[5,10, 20]}
              sx={{
                border: 'none',
                bgcolor: '#fff',
                '& .MuiDataGrid-cell': {
                    bgcolor: '#fff',
                    border: 'none',
                },
                '& .MuiDataGrid-columnHeaders': {
                    bgcolor: '#f5f5f5',
                },
            }}
            />
          </Paper>
        </Container>
      </>
    );
  };
  
  export default History;