import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import { useState, useMemo } from 'react';
import { validateRoomCode } from '../utils/ValidationUtils';
import { CustomButton } from './styled-components/CustomButton';
import { CustomContainer } from './styled-components/CustomContainer';

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
    <CustomContainer
      flexDirection="column"
      alignItems="center"
      className={classes.dashboardContainer}>
      <CustomButton className={classes.button}>Create Room</CustomButton>
      <CustomButton
        disabled={showCodeInput && !isValidCode}
        onClick={handleJoinClick}
        className={classes.button}>
        Join Room
      </CustomButton>

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
    </CustomContainer>
  );
};

const useStyles = makeStyles({
  dashboardContainer: {
    flex: '1 0 auto',
    minHeight: '100vh',
    gap: '3em',
  },
  button: {
    color: `${Colors.NICE_PURPLE}`,
    borderRadius: '5px',
    border: `3px solid ${Colors.NICE_PURPLE}`,
    width: '50%',
    fontSize: '24px',
  },
  inputCode: {
    width: '50%',
  },
  error: {
    fontSize: '8px',
    color: Colors.RED,
  },
});
