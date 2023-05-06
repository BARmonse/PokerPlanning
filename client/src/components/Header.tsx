import { makeStyles } from '@mui/styles';
import { Colors } from '../enums/Colors';
import {
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { Language } from '../enums/Language';

export const Header = () => {
  const classes = useStyles();

  const [language, setLanguage] = useState<string>(Language.ENGLISH);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const CustomContainer = styled(Container)({
    display: 'flex',
  });

  return (
    <CustomContainer className={classes.headerContainer}>
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
    display: 'flex',
    justifyContent: 'center',
    flex: '0 0 auto',
    maxWidth: '100%',
    margin: '0 0 5em 0',
    padding: '0',
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
