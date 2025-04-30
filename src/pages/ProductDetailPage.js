import React from 'react';
import { Box } from '@mui/material';
import WebAppBar from '../components/Appbar';
import ProductDetail from '../components/ProductDetail';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WebAppBar />
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4 }}>
        <ProductDetail />
      </Box>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;