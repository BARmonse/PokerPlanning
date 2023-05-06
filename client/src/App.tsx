import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Colors } from './enums/Colors';
import './index.css';
import { makeStyles } from '@mui/styles';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';
import { CustomContainer } from './components/styled-components/CustomContainer';
import { useEffect } from 'react';
import * as WebSocket from 'websocket';

const App = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <CustomContainer
      flexDirection="column"
      alignItems="center"
      className={classes.appContainer}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CustomContainer>
  );
};

export default App;

const useStyles = makeStyles({
  appContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    minHeight: '100vh',
  },
});
