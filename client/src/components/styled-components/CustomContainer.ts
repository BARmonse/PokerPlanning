import { Container, ContainerProps } from '@mui/material';
import styled from 'styled-components';

interface CustomContainerProps extends ContainerProps {
  width?: string;
  alignItems?: string;
  flexDirection?: string;
  padding?: string;
  margin?: string;
}

export const CustomContainer = styled(Container)<CustomContainerProps>`
  display: flex;
  max-width: 100%;
  align-items: ${props => props.alignItems || 'none'};
  padding: ${props => props.padding || '0 0 0 0'};
  margin: ${props => props.margin || '0 0 0 0'};
  flex-direction: ${props => props.flexDirection || 'row'};
`;
