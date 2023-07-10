import { useEffect, useMemo, useState } from 'react';
import WebSocketService from '../services/WebSocketService';
import { useNavigate } from 'react-router';
import { validateUsername } from '../utils/ValidationUtils';
import { Typography, Input, Button, Box } from '@mui/material';
import { Player } from '../interfaces/Player';
import { EventType } from '../enums/EventType';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/useRedux';
import { userActions } from '../store/user-slice';
import { Style } from '../interfaces/Style';
import { Colors } from '../enums/Colors';

export const HomeComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');

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

  const handleUserLogged = (event: MessageEvent) => {
    const createdPlayer = JSON.parse(event.data).payload as Player;

    dispatch(userActions.setUserState(createdPlayer));
    navigate('/dashboard', {
      replace: true,
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
      <Typography sx={styles.username}>
        {t('enter_your_username').toUpperCase()}
      </Typography>
      <Input
        value={username}
        placeholder={t('enter_your_username')!}
        onChange={handleUsername}
      />
      <Button
        sx={styles.button}
        onClick={handleUserLogin}
        disabled={!isValidUsername}>
        {t('create_user')}
      </Button>
    </Box>
  );
};

const styles: Style = {
  username: {
    fontSize: '1.5rem',
    color: Colors.NICE_PURPLE,
    fontWeight: 'bold',
  },
  button: {
    color: Colors.NICE_PURPLE,
    borderRadius: '5px',
    border: `3px solid ${Colors.NICE_PURPLE}`,
    width: '50%',
    fontSize: '24px',
  },
};
