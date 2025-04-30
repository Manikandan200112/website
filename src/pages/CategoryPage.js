import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import WebAppBar from '../components/Appbar';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : 'All Products';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WebAppBar />
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link 
              color="inherit" 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Home
            </Link>
            <Link 
              color="inherit" 
              href="/products" 
              onClick={(e) => { e.preventDefault(); navigate('/products'); }}
            >
              Products
            </Link>
            {category && (
              <Typography color="text.primary">{categoryTitle}</Typography>
            )}
          </Breadcrumbs>
          
          <Typography variant="h4" component="h1" gutterBottom>
            {categoryTitle}
          </Typography>
          
          <ProductList category={category} />
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default CategoryPage;