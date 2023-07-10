import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Style } from '../interfaces/Style';
import { Colors } from '../enums/Colors';

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.notFoundContainer}>
      <Typography sx={styles.notFoundText}>{t('nothing_here')}</Typography>
    </Box>
  );
};

const styles: Style = {
  notFoundContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  notFoundText: {
    color: Colors.RED,
    fontWeight: 'bolder',
    fontSize: '24px',
  },
};
