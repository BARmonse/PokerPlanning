import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Language } from '../enums/Language';
import { useTranslation } from 'react-i18next';
import { POKER_PLANNING } from '../constants/constants';
import { Style } from '../interfaces/Style';
import { Colors } from '../enums/Colors';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState<string>(Language.ENGLISH);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.titleContainer}>
        <Typography
          sx={isMobile ? styles.mobileHeaderTitle : styles.headerTitle}>
          {POKER_PLANNING}
        </Typography>
      </Box>
      <Box sx={styles.selectLanguageContainer}>
        <Select
          sx={styles.languageSelector}
          labelId="language"
          id="language"
          value={language}
          label="Language"
          onChange={handleLanguageChange}>
          <MenuItem value={Language.ENGLISH}>{t('english')}</MenuItem>
          <MenuItem value={Language.SPANISH}>{t('spanish')}</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

const styles: Style = {
  headerContainer: {
    display: 'flex',
    minHeight: '10vh',
    backgroundColor: Colors.NICE_PURPLE,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: '0 0 auto',
    marginBottom: '4%',
  },
  titleContainer: {
    margin: 'auto',
  },
  headerTitle: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: '3.125rem',
  },
  mobileHeaderTitle: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: '1.875rem',
  },
  selectLanguageContainer: {
    alignSelf: 'flex-end',
  },
  languageSelector: {
    display: 'flex',
    alignSelf: 'center',
  },
};
