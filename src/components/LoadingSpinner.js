import React from 'react';
import { Box, CircularProgress, Typography, styled } from '@mui/material';

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  padding: theme.spacing(3),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <StyledCircularProgress size={60} thickness={4} />
      <Typography variant="h6" color="text.secondary" align="center">
        {message}
      </Typography>
    </LoadingContainer>
  );
};

export default LoadingSpinner;