import { Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import { useState, useMemo } from 'react';
import { validateRoomCode } from '../utils/ValidationUtils';

export const Dashboard = () => {
  const classes = useStyles();
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  const handleJoinClick = () => {
    setShowCodeInput(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event?.target.value);
  };

  return (
    <Container className={classes.dashboardContainer}>
      <Button className={classes.button}>Create Room</Button>
      <Button
        disabled={showCodeInput && !isValidCode}
        onClick={handleJoinClick}
        className={classes.button}>
        Join Room
      </Button>

      {showCodeInput && (
        <TextField
          className={classes.inputCode}
          placeholder="Enter a code to enter a room"
          defaultValue={null}
          value={code}
          onChange={handleOnChange}
          error={!isValidCode}
          label="Code Room"
        />
      )}
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
  inputCode: {
    width: '50%',
  },
  error: {
    fontSize: '8px',
    color: Colors.RED,
  },
});
