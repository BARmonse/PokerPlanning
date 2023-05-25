import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { WEB_SOCKET_URL } from '../constants/constants';
import { EventType } from '../enums/EventType';
import { Box, CircularProgress } from '@mui/material';
import { roomContainer } from '../styles/Room';

export const Room = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const socket = io(WEB_SOCKET_URL, {
      transports: ['websocket'],
    });

    socket.emit(EventType.ROOM_CREATED);
    socket.on(EventType.ROOM_CREATED, () =>
      console.log('The Room was Created'),
    );
    setLoading(false);
  }, []);

  if (loading)
    return (
      <Box sx={roomContainer}>
        <CircularProgress color="success" />
      </Box>
    );

  return <Box sx={roomContainer}>hola</Box>;
};
