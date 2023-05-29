import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { roomContainer } from '../styles/Room';

export const Room = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={roomContainer}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return <Box sx={roomContainer}>hola</Box>;
};
