import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import { AppRouter } from './router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#363636',
    },
    secondary: {
      main: '#575757',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

function App() {
  const getBasename = () => {
    if (process.env.PUBLIC_URL) {
      try {
        const url = new URL(process.env.PUBLIC_URL);
        return url.pathname;
      } catch {
        return process.env.PUBLIC_URL;
      }
    }
    return '';
  };

  const basename = getBasename();
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={basename}>
          <div className="app">
            <AppRouter />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
