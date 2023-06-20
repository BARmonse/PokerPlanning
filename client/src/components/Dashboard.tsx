import { Box, Button, TextField } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { validateRoomCode } from '../utils/ValidationUtils';
import {
  buttonStyle,
  dashboardContainerStyle,
  inputCodeStyle,
} from '../styles/Dashboard';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useLocation, useNavigate } from 'react-router-dom';
import WebSocketService from '../services/WebSocketService';
import { EventType } from '../enums/EventType';
import { Room } from '../interfaces/Room';
import { Player } from '../interfaces/Player';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const [code, setCode] = useState<string>('');

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  const player = location.state as Player;

  useEffect(() => {
    WebSocketService.webSocket.addEventListener('message', message =>
      navigate('/room', {
        replace: true,
        state: JSON.parse(message.data).payload as Room,
      }),
    );

    return () =>
      WebSocketService.webSocket.removeEventListener('message', message =>
        navigate('/room', {
          replace: true,
          state: JSON.parse(message.data).payload as Room,
        }),
      );
  }, []);

  const handleJoinClick = () => {
    WebSocketService.sendEvent(EventType.JOIN_ROOM, {
      username: player.name,
      code: code,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleCreateRoomClick = () => {
    WebSocketService.sendEvent(EventType.ROOM_CREATED, {
      username: player.name,
    });
  };

  return (
    <Box sx={dashboardContainerStyle}>
      <Button sx={buttonStyle} onClick={handleCreateRoomClick}>
        {t('create_room')}
      </Button>
      <Button
        disabled={!isValidCode}
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
