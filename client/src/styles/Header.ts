import { SxProps } from '@mui/material';
import { Colors } from '../enums/Colors';

export const headerContainerStyle: SxProps = {
  display: 'flex',
  minHeight: '10vh',
  backgroundColor: Colors.NICE_PURPLE,
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: '0 0 auto',
  marginBottom: '4%',
};

export const titleContainerStyle: SxProps = {
  margin: 'auto',
};

export const headerTitleStyle: SxProps = {
  display: 'flex',
  alignSelf: 'center',
  color: Colors.WHITE,
  fontSize: '3.125rem',
};

export const mobileHeaderTitleStyle: SxProps = {
  display: 'flex',
  alignSelf: 'center',
  color: Colors.WHITE,
  fontSize: '1.875rem',
};

export const selectLanguageContainerStyle: SxProps = {
  alignSelf: 'flex-end',
};

export const languageSelectStyle: SxProps = {
  display: 'flex',
  alignSelf: 'center',
};
