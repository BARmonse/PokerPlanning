import { SxProps } from '@mui/material';
import { Colors } from '../enums/Colors';

export const notFoundContainerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

export const notFoundTextStyle: SxProps = {
  color: Colors.RED,
  fontWeight: 'bolder',
  fontSize: '24px',
};
