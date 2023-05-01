import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import { Typography } from '@mui/material';

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      <Typography className={classes.headerTitle}>POKER PLANNING</Typography>
    </div>
  );
};

const useStyles = makeStyles({
  headerContainer: {
    minHeight: '10vh',
    backgroundColor: Colors.NICE_PURPLE,
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 auto',
  },
  headerTitle: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors.WHITE,
  },
});
