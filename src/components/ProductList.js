import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Container, 
  Pagination, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Chip,
  Divider,
  Button,
  Fade,
  useTheme,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { getProductsByCategory, searchProducts, getDiscountedProducts, getProductsByBrand } from '../data/enhanced-products';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  marginBottom: theme.spacing(3),
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;

  useEffect(() => {
    // Get products based on category
    setLoading(true);
    
    // Simulate network delay for loading state demonstration
    setTimeout(() => {
      const categoryProducts = category 
        ? getProductsByCategory(category) 
        : searchProducts('');
      
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
      setLoading(false);
    }, 800);
  }, [category]);

  useEffect(() => {
    // Apply sorting and filtering
    let result = [...products];
    
    // Apply search filter if query exists
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    setPage(1); // Reset to first page when filters change
  }, [sortBy, searchQuery, products]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Search is already handled by the useEffect
  };

  const theme = useTheme();
  const [viewMode, setViewMode] = useState('grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner message="Loading products..." />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledPaper elevation={0} sx={{ mb: 4, background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)' }}>
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <CategoryTitle variant="h3" component="h1" gutterBottom>
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </CategoryTitle>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
            {category 
              ? `Explore our collection of ${category} products. Find the best deals and latest releases.` 
              : 'Browse our complete collection of products. We offer a wide range of high-quality items at competitive prices.'}
          </Typography>
          
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{ 
                        borderRadius: '0 8px 8px 0',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        px: 3,
                        py: 1.1,
                      }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  pr: 0,
                }
              }}
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </StyledPaper>
      
      <StyledPaper elevation={0}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2, 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="subtitle1" fontWeight={600}>
              {filteredProducts.length} Products
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <IconButton 
                size="small" 
                onClick={() => handleViewModeChange('grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
                sx={{ 
                  bgcolor: viewMode === 'grid' ? 'rgba(107, 102, 255, 0.1)' : 'transparent',
                  borderRadius: '4px 0 0 4px',
                }}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => handleViewModeChange('list')}
                color={viewMode === 'list' ? 'primary' : 'default'}
                sx={{ 
                  bgcolor: viewMode === 'list' ? 'rgba(107, 102, 255, 0.1)' : 'transparent',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <ViewListIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SortIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <Fade in={true} timeout={500}>
            <Grid container spacing={3}>
              {displayedProducts.map((product) => (
                <Grid 
                  item 
                  key={product.id} 
                  xs={12} 
                  sm={viewMode === 'list' ? 12 : 6} 
                  md={viewMode === 'list' ? 12 : 4}
                  lg={viewMode === 'list' ? 12 : 3}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        ) : (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
              alt="No products found" 
              style={{ width: 120, height: 120, opacity: 0.5, marginBottom: 16 }}
            />
            <Typography variant="h6" gutterBottom>No products found</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Try adjusting your search or filter criteria
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => {
                setSearchQuery('');
                setSortBy('featured');
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                },
                '& .MuiPaginationItem-page.Mui-selected': {
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                  color: 'white',
                },
              }}
            />
          </Box>
        )}
      </StyledPaper>
    </Container>
  );
};

export default ProductList;