import { Box, Button, TextField } from '@mui/material';
import { useState, useMemo } from 'react';
import { validateRoomCode } from '../utils/ValidationUtils';
//import useWebSocket from 'react-use-websocket';
//import { WEB_SOCKET_URL } from '../constants/constants';
import {
  buttonStyle,
  dashboardContainerStyle,
  inputCodeStyle,
} from '../styles/Dashboard';

export const Dashboard = () => {
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  /*const ws = useWebSocket(WEB_SOCKET_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
  });
  */

  const handleJoinClick = () => {
    setShowCodeInput(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event?.target.value);
  };

  return (
    <Box sx={dashboardContainerStyle}>
      <Button sx={buttonStyle}>Create Room</Button>
      <Button
        disabled={showCodeInput && !isValidCode}
        onClick={handleJoinClick}
        sx={buttonStyle}>
        Join Room
      </Button>

      {showCodeInput && (
        <TextField
          sx={inputCodeStyle}
          placeholder="Enter a code to enter a room"
          defaultValue={null}
          value={code}
          onChange={handleOnChange}
          error={!isValidCode}
          label="Code Room"
        />
      )}
    </Box>
  );
};
