import { Box, Typography } from '@mui/material';
import {
  notFoundContainerStyle,
  notFoundTextStyle,
} from '../styles/PageNotFound';
import { useTranslation } from 'react-i18next';

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <Box sx={notFoundContainerStyle}>
      <Typography sx={notFoundTextStyle}>{t('nothing_here')}</Typography>
    </Box>
  );
};
