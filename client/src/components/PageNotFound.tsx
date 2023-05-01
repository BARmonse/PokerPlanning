import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';

export const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Container className={classes.notFoundContainer}>
      <Typography className={classes.notFoundText}>
        Nothing here, please go back...
      </Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  notFoundContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  notFoundText: {
    color: Colors.RED,
    fontWeight: 'bolder',
    fontSize: '12px',
    textAlign: 'center',
  },
});
