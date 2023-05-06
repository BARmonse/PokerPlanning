import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { Language } from '../enums/Language';
import { CustomContainer } from './styled-components/CustomContainer';

export const Header = () => {
  const classes = useStyles();

  const [language, setLanguage] = useState<string>(Language.ENGLISH);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <CustomContainer margin="0 0 4em 0" className={classes.headerContainer}>
      <Typography className={classes.headerTitle}>POKER PLANNING</Typography>
      <Select
        className={classes.language}
        labelId="language"
        id="language"
        value={language}
        label="Language"
        onChange={handleLanguageChange}>
        <MenuItem value={Language.ENGLISH}>English</MenuItem>
        <MenuItem value={Language.SPANISH}>Spanish</MenuItem>
      </Select>
    </CustomContainer>
  );
};

const useStyles = makeStyles({
  headerContainer: {
    minHeight: '10vh',
    backgroundColor: Colors.NICE_PURPLE,
    justifyContent: 'center',
    flex: '0 0 auto',
  },
  headerTitle: {
    display: 'flex',
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: '20px',
  },
  language: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
