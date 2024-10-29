import React from 'react';
import Appbar from './components/layout/Appbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans',
    ].join(','),
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Appbar />
    </ThemeProvider>
  );
};

export default App;