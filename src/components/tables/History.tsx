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
import LoadingAnimation from '../common/LoadingAnimation';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';;

const API_URL = import.meta.env.VITE_API_URL;

dayjs.extend(utc);
dayjs.extend(timezone);

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
  
    const columns: GridColDef[] = [
      { 
        field: 'numbering', 
        headerName: 'No', 
        width: 70,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'no_request', headerName: 'No. Request', width: 450 },
      { 
          field: 'tgl_lpj', 
          headerName: 'Date', 
          width: 250,
          valueFormatter: (params) => {
            const date = dayjs(params.value).utc();
            return date.isValid() ? date.format('YYYY/MM/DD') : 'Invalid Date';
          }
      },
      { 
          field: 'created_at', 
          headerName: 'Created At', 
          width: 250,
          valueFormatter: (params) => {
            const date = dayjs(params.value).utc();
            return date.isValid() ? date.format('YYYY/MM/DD HH:mm:ss') : 'Invalid Date';
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