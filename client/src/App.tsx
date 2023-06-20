import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { Box } from '@mui/material';
import { appContainerStyle } from './styles/App';
import { RoomComponent } from './components/RoomComponent';
import { HomeComponent } from './components/HomeComponent';
import { Dashboard } from './components/Dashboard';

const App = () => {
  return (
    <Box sx={appContainerStyle}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room" element={<RoomComponent />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
