import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { Box } from '@mui/material';
import { RoomComponent } from './components/RoomComponent';
import { HomeComponent } from './components/HomeComponent';
import { Dashboard } from './components/Dashboard';
import { Style } from './interfaces/Style';
import { Colors } from './enums/Colors';

const App = () => {
  return (
    <Box sx={styles.container}>
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

const styles: Style = {
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    minHeight: '100vh',
  },
};

export default App;
