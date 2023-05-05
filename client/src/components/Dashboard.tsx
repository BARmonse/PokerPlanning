import { Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container className={classes.dashboardContainer}>
      <Button className={classes.button}>Create Room</Button>
      <Button className={classes.button}>Join Room</Button>
    </Container>
  );
};

const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex !important',
    flex: '1 0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    gap: '3em',
  },
  button: {
    display: 'flex',
    color: `${Colors.NICE_PURPLE} !important`,
    borderRadius: '5px',
    border: `3px solid ${Colors.NICE_PURPLE} !important`,
    width: '50%',
    fontSize: '24px !important',
  },
});
