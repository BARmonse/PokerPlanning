import { SxProps } from '@mui/material';
import { Colors } from '../enums/Colors';

export const buttonStyle: SxProps = {
  color: Colors.NICE_PURPLE,
  borderRadius: '5px',
  border: `3px solid ${Colors.NICE_PURPLE}`,
  width: '50%',
  fontSize: '24px',
};

export const dashboardContainerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: '1 0 auto',
  minHeight: '100vh',
  gap: '3em',
};

export const inputCodeStyle: SxProps = {
  width: '50%',
};

export const userNameStyle: SxProps = {
  fontSize: '1.5rem',
  color: Colors.NICE_PURPLE,
  fontWeight: 'bold',
};
