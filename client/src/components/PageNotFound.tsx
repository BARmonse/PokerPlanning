import { Box, Typography } from '@mui/material';
import {
  notFoundContainerStyle,
  notFoundTextStyle,
} from '../styles/PageNotFound';

export const PageNotFound = () => {
  return (
    <Box sx={notFoundContainerStyle}>
      <Typography sx={notFoundTextStyle}>
        Nothing here, please go back...
      </Typography>
    </Box>
  );
};
