import { useEffect, useState } from 'react';
import { EventType } from '../enums/EventType';
import { Box, CircularProgress } from '@mui/material';
import { roomContainer } from '../styles/Room';
import WebSocketService from '../services/WebSocketService';

export const Room = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    WebSocketService.sendEvent(EventType.ROOM_CREATED, {});
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={roomContainer}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return <Box sx={roomContainer}>hola</Box>;
};
