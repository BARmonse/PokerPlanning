import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Colors } from './enums/Colors';
import './index.css';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { Box } from '@mui/material';
import { WEB_SOCKET_URL } from './constants/constants';
import useWebSocket from 'react-use-websocket';

const App = () => {
  useWebSocket(WEB_SOCKET_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });

  return (
    <Box sx={{ backgroundColor: Colors.LIGHT_GRAY, minHeight: '100vh' }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
