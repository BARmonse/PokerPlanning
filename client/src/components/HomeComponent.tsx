import { useEffect, useMemo, useState } from 'react';
import WebSocketService from '../services/WebSocketService';
import { useNavigate } from 'react-router';
import { validateUsername } from '../utils/ValidationUtils';
import { Typography, Input, Button, Box } from '@mui/material';
import { userNameStyle } from '../styles/Home';
import { Player } from '../interfaces/Player';
import { buttonStyle } from '../styles/Dashboard';
import { EventType } from '../enums/EventType';
import { useTranslation } from 'react-i18next';

export const HomeComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const { t } = useTranslation();

  const isValidUsername = useMemo(() => validateUsername(username), [username]);

  useEffect(() => {
    WebSocketService.webSocket.addEventListener('message', handleUserLogged);

    return () =>
      WebSocketService.webSocket.removeEventListener(
        'message',
        handleUserLogged,
      );
  }, []);

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUserLogged = (event: MessageEvent<Player>) => {
    navigate('/dashboard', {
      replace: true,
      state: JSON.parse(event.data).payload as Player,
    });
  };

  const handleUserLogin = () => {
    WebSocketService.sendEvent(EventType.USERNAME_CREATED, {
      username: username,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10%',
      }}>
      <Typography sx={userNameStyle}>
        {t('enter_your_username').toUpperCase()}
      </Typography>
      <Input
        value={username}
        placeholder={t('enter_your_username')!}
        onChange={handleUsername}
      />
      <Button
        sx={buttonStyle}
        onClick={handleUserLogin}
        disabled={!isValidUsername}>
        {t('create_room')}
      </Button>
    </Box>
  );
};
