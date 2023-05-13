import { SxProps } from '@mui/material';
import { Colors } from '../enums/Colors';

export const headerContainerStyle: SxProps = {
  display: 'flex',
  minHeight: '10vh',
  backgroundColor: Colors.NICE_PURPLE,
  justifyContent: 'center',
  alignContent: 'flex-end',
  flex: '0 0 auto',
  marginBottom: '4%',
};

export const headerTitleStyle: SxProps = {
  display: 'flex',
  alignSelf: 'center',
  color: Colors.WHITE,
  fontSize: '50px',
};

export const languageSelectStyle: SxProps = {
  display: 'flex',
  alignSelf: 'center',
};
