import React from 'react';
import LoginForm from '../components/login';
import { Box, CssBaseline } from '@mui/material';

const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <LoginForm />
        </Box>
    );
};

export default LoginPage;