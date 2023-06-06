import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { validateRoomCode, validateUsername } from '../utils/ValidationUtils';
import {
  buttonStyle,
  dashboardContainerStyle,
  inputCodeStyle,
  userNameStyle,
} from '../styles/Dashboard';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useNavigate } from 'react-router-dom';
import WebSocketService from '../services/WebSocketService';
import { EventType } from '../enums/EventType';
import { Room } from '../interfaces/Room';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  const isValidUsername = useMemo(() => validateUsername(username), [username]);

  useEffect(() => {
    WebSocketService.webSocket.addEventListener('message', message =>
      navigate('/room', {
        replace: true,
        state: JSON.parse(message.data).payload as Room,
      }),
    );

    return () =>
      WebSocketService.webSocket.addEventListener('message', message =>
        navigate('/room', {
          replace: true,
          state: JSON.parse(message.data).payload as Room,
        }),
      );
  }, []);

  const handleJoinClick = () => {
    WebSocketService.sendEvent(EventType.JOIN_ROOM, {
      username: username,
      code: code,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleCreateRoomClick = () => {
    WebSocketService.sendEvent(EventType.ROOM_CREATED, { username: username });
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Box sx={dashboardContainerStyle}>
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
        onClick={handleCreateRoomClick}
        disabled={!isValidUsername}>
        {t('create_room')}
      </Button>
      <Button
        disabled={!isValidCode || !isValidUsername}
        onClick={handleJoinClick}
        sx={buttonStyle}>
        {t('join_room')}
      </Button>

      <TextField
        sx={inputCodeStyle}
        placeholder={t('enter_code')!}
        value={code}
        onChange={handleOnChange}
        error={!isValidCode}
        label={t('code_room')}
      />
    </Box>
  );
};
