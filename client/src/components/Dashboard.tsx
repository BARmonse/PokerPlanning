import { Box, Button, TextField } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { validateRoomCode } from '../utils/ValidationUtils';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../services/WebSocketService';
import { EventType } from '../enums/EventType';
import { Room } from '../interfaces/Room';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { userActions } from '../store/user-slice';
import { Event } from '../interfaces/Event';
import { Colors } from '../enums/Colors';
import { Style } from '../interfaces/Style';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [code, setCode] = useState<string>('');

  const dispatch = useAppDispatch();

  const loggedUser = useAppSelector(state => state.user);

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  useEffect(() => {
    WebSocketService.webSocket.addEventListener(
      'message',
      handleCreateAndJoinRoomEvent,
    );

    return () =>
      WebSocketService.webSocket.removeEventListener(
        'message',
        handleCreateAndJoinRoomEvent,
      );
  }, []);

  const handleCreateAndJoinRoomEvent = (event: MessageEvent) => {
    const parsedEvent: Event = JSON.parse(event.data);
    (parsedEvent.payload as Room).players;

    if (parsedEvent.type === EventType.ROOM_CREATED) {
      const user = (parsedEvent.payload as Room).players.find(
        player => loggedUser.identifier === player.identifier,
      );
      dispatch(userActions.setUserState(user!));
    }

    navigate('/room', {
      replace: true,
      state: parsedEvent.payload as Room,
    });
  };

  const handleJoinClick = () => {
    WebSocketService.sendEvent(EventType.JOIN_ROOM, {
      user: loggedUser,
      code: code,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleCreateRoomClick = () => {
    WebSocketService.sendEvent(EventType.ROOM_CREATED, {
      user: loggedUser,
    });
  };

  return (
    <Box sx={styles.container}>
      <Button sx={styles.button} onClick={handleCreateRoomClick}>
        {t('create_room')}
      </Button>
      <Button
        disabled={!isValidCode}
        onClick={handleJoinClick}
        sx={styles.button}>
        {t('join_room')}
      </Button>

      <TextField
        sx={styles.inputCode}
        placeholder={t('enter_code')!}
        value={code}
        onChange={handleOnChange}
        error={!isValidCode}
        label={t('code_room')}
      />
    </Box>
  );
};

const styles: Style = {
  button: {
    color: Colors.NICE_PURPLE,
    borderRadius: '5px',
    border: `3px solid ${Colors.NICE_PURPLE}`,
    width: '50%',
    fontSize: '24px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1 0 auto',
    minHeight: '100vh',
    gap: '3em',
  },
  inputCode: {
    width: '50%',
  },
};
