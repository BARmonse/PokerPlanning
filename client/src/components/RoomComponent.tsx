import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { playersListContainer, roomContainer } from '../styles/Room';
import { useLocation } from 'react-router';
import { Room } from '../interfaces/Room';
import { useTranslation } from 'react-i18next';
import { PlayerListComponent } from './PlayerListComponent';

export const RoomComponent = () => {
  const location = useLocation();

  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<Room | null>(null);

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
      <Typography sx={{ color: 'black', fontSize: '2rem' }}>
        {t('your_code_room')}
      </Typography>
      <Typography sx={{ color: 'red', fontSize: '1.8rem' }}>
        {room?.code}
      </Typography>
      <Box sx={playersListContainer}>
        <PlayerListComponent players={room?.players ?? []} />
      </Box>
    </Box>
  );
};
