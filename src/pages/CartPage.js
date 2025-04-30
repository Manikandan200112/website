import React from 'react';
import { Box } from '@mui/material';
import WebAppBar from '../components/Appbar';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WebAppBar />
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4 }}>
        <Cart />
      </Box>
    </div>
  );
};

export default CartPage;