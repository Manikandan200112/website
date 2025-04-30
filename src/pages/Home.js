import React from 'react';
import { Box } from '@mui/material';
import WebAppBar from '../components/Appbar';
import EnhancedHomeBody from '../components/EnhancedHomeBody';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <WebAppBar/>
            <Box component="main" sx={{ flexGrow: 1, pt: 8, pb: 4 }}>
                <EnhancedHomeBody/>
            </Box>
            <Footer />
        </div>
    );
}

export default Home;