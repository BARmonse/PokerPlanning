import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const Dashboard = () => {
  const classes = useStyles();
  return <Container className={classes.dashboardContainer}></Container>;
};

const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    flex: '1 0 auto',
  },
});
