import Button, { ButtonProps } from '@mui/material/Button';
import styled from 'styled-components';

interface CustomButtonProps extends ButtonProps {
  maxWidth?: string;
}

export const CustomButton = styled(Button)<CustomButtonProps>`
  display: flex;
  max-width: ${props => props.maxWidth || '100%'};
`;
