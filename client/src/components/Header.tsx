import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Language } from '../enums/Language';
import {
  headerContainerStyle,
  headerTitleStyle,
  languageSelectStyle,
} from '../styles/Header';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>(Language.ENGLISH);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={headerContainerStyle}>
      <Typography sx={headerTitleStyle}>Poker Planning</Typography>
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
  );
};
