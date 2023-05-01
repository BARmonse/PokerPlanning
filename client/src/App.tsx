import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Colors } from './enums/Colors';
import './index.css';
import { makeStyles } from '@mui/styles';
import { Header } from './components/Header';
import { PageNotFound } from './components/PageNotFound';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const useStyles = makeStyles({
  appContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    minHeight: '100vh',
  },
});
