import { SxProps } from '@mui/material';
import { Colors } from '../enums/Colors';

export const roomContainer: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

export const playersListContainer: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${Colors.NICE_PURPLE}`,
  borderRadius: '20%',
  padding: '5%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  alignSelf: 'flex-start',
};
