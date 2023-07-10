import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { Room } from '../interfaces/Room';
import { useTranslation } from 'react-i18next';
import { PlayerListComponent } from './PlayerListComponent';
import WebSocketService from '../services/WebSocketService';
import { Style } from '../interfaces/Style';
import { Colors } from '../enums/Colors';

export const RoomComponent = () => {
  const location = useLocation();

  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    WebSocketService.webSocket.addEventListener(
      'message',
      handleWebSocketMessage,
    );

    setLoading(true);
    setRoom(location.state as Room);
    setLoading(false);

    return () =>
      WebSocketService.webSocket.removeEventListener(
        'message',
        handleWebSocketMessage,
      );
  }, []);

  const handleWebSocketMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    setRoom(data.payload as Room);
  };

  if (loading) {
    return (
      <Box sx={styles.roomContainer}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box sx={styles.roomContainer}>
      <Typography sx={{ color: 'black', fontSize: '2rem' }}>
        {t('your_code_room')}
      </Typography>
      <Typography sx={{ color: 'red', fontSize: '1.8rem' }}>
        {room?.code}
      </Typography>
      <Box sx={styles.playersListContainer}>
        <PlayerListComponent players={room?.players ?? []} />
      </Box>
    </Box>
  );
};

const styles: Style = {
  roomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  playersListContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${Colors.NICE_PURPLE}`,
    borderRadius: '20%',
    padding: '5%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
};
