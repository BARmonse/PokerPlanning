import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Language } from '../enums/Language';

export const Header = () => {
  const classes = useStyles();

  const [language, setLanguage] = useState<string>(Language.ENGLISH);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '10vh',
        backgroundColor: Colors.NICE_PURPLE,
        justifyContent: 'center',
        flex: '0 0 auto',
        marginBottom: '4%',
      }}>
      <Typography variant="h3" className={classes.headerTitle}>
        Poker Planning
      </Typography>
      <Select
        className={classes.languageSelect}
        labelId="language"
        id="language"
        value={language}
        label="Language"
        onChange={handleLanguageChange}>
        <MenuItem value={Language.ENGLISH}>English</MenuItem>
        <MenuItem value={Language.SPANISH}>Spanish</MenuItem>
      </Select>
    </Box>
  );
};

const useStyles = makeStyles({
  headerTitle: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors.WHITE,
  },
  languageSelect: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
