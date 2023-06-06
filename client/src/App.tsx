import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import './index.css';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { Box } from '@mui/material';
import { appContainerStyle } from './styles/App';
import { RoomComponent } from './components/RoomComponent';

const App = () => {
  return (
    <Box sx={appContainerStyle}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/room" element={<RoomComponent />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
