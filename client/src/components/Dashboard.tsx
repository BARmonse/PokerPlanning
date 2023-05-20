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
import { io } from 'socket.io-client';
import { WEB_SOCKET_URL } from '../constants/constants';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const socket = io(WEB_SOCKET_URL, {
      transports: ['websocket'],
    });

    console.log(socket.active);
  }, []);

  const isValidCode = useMemo(() => validateRoomCode(code), [code]);

  const handleJoinClick = () => {
    setShowCodeInput(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event?.target.value);
  };

  const handleCreateRoomClick = () => {};

  return (
    <Box sx={dashboardContainerStyle}>
      <Button sx={buttonStyle} onClick={handleCreateRoomClick}>
        {t('create_room')}
      </Button>
      <Button
        disabled={showCodeInput && !isValidCode}
        onClick={handleJoinClick}
        sx={buttonStyle}>
        {t('join_room')}
      </Button>

      {showCodeInput && (
        <TextField
          sx={inputCodeStyle}
          placeholder={t('enter_code')!}
          defaultValue={null}
          value={code}
          onChange={handleOnChange}
          error={!isValidCode}
          label={t('code_room')}
        />
      )}
    </Box>
  );
};
