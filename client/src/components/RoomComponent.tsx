import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { roomContainer } from '../styles/Room';
import { useLocation } from 'react-router';
import { Room } from '../interfaces/Room';

export const RoomComponent = () => {
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<Room | null>(null);

  console.log(room);

  useEffect(() => {
    setLoading(true);
    setRoom(location.state as Room);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={roomContainer}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box sx={roomContainer}>
      <Typography sx={{ color: 'red', fontSize: '5rem' }}>
        {room?.code}
      </Typography>
      {room?.code} {room?.identifier}
    </Box>
  );
};
