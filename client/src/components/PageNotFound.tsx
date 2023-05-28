import { Box, Typography } from '@mui/material';
import {
  notFoundContainerStyle,
  notFoundTextStyle,
} from '../styles/PageNotFound';
import { t } from 'i18next';

export const PageNotFound = () => {
  return (
    <Box sx={notFoundContainerStyle}>
      <Typography sx={notFoundTextStyle}>{t('nothing_here')}</Typography>
    </Box>
  );
};
