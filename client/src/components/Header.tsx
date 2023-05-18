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
import {
  headerContainerStyle,
  headerTitleStyle,
  languageSelectStyle,
  mobileHeaderTitleStyle,
  selectLanguageContainerStyle,
  titleContainerStyle,
} from '../styles/Header';
import { useTranslation } from 'react-i18next';
import { POKER_PLANNING } from '../constants/constants';

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
    <Box sx={headerContainerStyle}>
      <Box sx={titleContainerStyle}>
        <Typography sx={isMobile ? mobileHeaderTitleStyle : headerTitleStyle}>
          {POKER_PLANNING}
        </Typography>
      </Box>
      <Box sx={selectLanguageContainerStyle}>
        <Select
          sx={languageSelectStyle}
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
