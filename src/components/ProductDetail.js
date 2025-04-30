import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
  Chip,
  TextField,
  IconButton,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Fade,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getProductById, getRelatedProducts } from '../data/enhanced-products';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

// Styled components
const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details
    setLoading(true);
    
    // Simulate network delay for loading state demonstration
    setTimeout(() => {
      const productData = getProductById(productId);
      if (productData) {
        setProduct(productData);
        
        // Fetch related products
        const related = getRelatedProducts(productId, 4);
        setRelatedProducts(related);
        setLoading(false);
      } else {
        // Product not found, redirect to products page
        navigate('/products');
      }
    }, 800);
  }, [productId, navigate]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <LoadingSpinner message="Loading product details..." />
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setSnackbarOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Home
        </Link>
        <Link 
          color="inherit" 
          href={`/products/${product.category}`} 
          onClick={(e) => { e.preventDefault(); navigate(`/products/${product.category}`); }}
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      {/* Product Details */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          mb: 4, 
          borderRadius: 4,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              {product.discount > 0 && (
                <Chip
                  label={`${product.discount}% OFF`}
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    zIndex: 1,
                  }}
                />
              )}
              <ProductImage
                src={product.image}
                alt={product.title}
              />
            </Box>
            
            {/* Image Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
              <IconButton 
                color="secondary" 
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 107, 0.08)',
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'rgba(107, 102, 255, 0.08)',
                  },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              {product.brand && (
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {product.brand}
                </Typography>
              )}
              
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating} rating)
                </Typography>
                {product.reviews && (
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    • {product.reviews.length} reviews
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', alignItems: 'baseline' }}>
              {product.discount > 0 ? (
                <>
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    sx={{ fontWeight: 700 }}
                  >
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      ml: 2, 
                      textDecoration: 'line-through',
                      fontWeight: 400,
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <Typography 
                  variant="h4" 
                  color="primary" 
                  sx={{ fontWeight: 700 }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Box>

            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Chip 
                label={product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'} 
                color={product.stock > 0 ? 'success' : 'error'} 
                variant="outlined"
                sx={{ mr: 1, fontWeight: 500 }}
              />
              <Chip 
                label={product.category.charAt(0).toUpperCase() + product.category.slice(1)} 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 500 }} 
              />
              {product.warranty && (
                <Chip 
                  label={product.warranty}
                  icon={<VerifiedIcon />}
                  variant="outlined"
                  sx={{ ml: 1, fontWeight: 500 }}
                />
              )}
            </Box>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Colors
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {product.colors.map((color) => (
                    <Chip 
                      key={color} 
                      label={color}
                      variant="outlined"
                      onClick={() => {}}
                      sx={{ 
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Sizes
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <Chip 
                      key={size} 
                      label={size}
                      variant="outlined"
                      onClick={() => {}}
                      sx={{ 
                        borderRadius: 1,
                        minWidth: 40,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 600 }}>
                Quantity:
              </Typography>
              <IconButton 
                size="small" 
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ 
                  min: 1, 
                  max: product.stock, 
                  style: { 
                    textAlign: 'center',
                    fontWeight: 600,
                  } 
                }}
                sx={{ 
                  width: '60px', 
                  mx: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
                size="small"
              />
              <IconButton 
                size="small" 
                onClick={handleIncreaseQuantity}
                disabled={quantity >= product.stock}
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                sx={{ 
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                  boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                    boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
                  },
                  '&.Mui-disabled': {
                    background: '#e0e0e0',
                  },
                  fontWeight: 600,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {}}
                sx={{ 
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Details Tabs */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 4, 
          borderRadius: 4,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2,
              fontWeight: 600,
            },
            '& .Mui-selected': {
              color: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {tabValue === 0 && (
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Product Description
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                {product.description}
              </Typography>
              
              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(107, 102, 255, 0.05)', 
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Key Features
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {product.specifications && product.specifications.map((spec, index) => (
                        <Typography 
                          key={index} 
                          component="li" 
                          variant="body1" 
                          sx={{ mb: 1 }}
                        >
                          <strong>{spec.name}:</strong> {spec.value}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(76, 175, 80, 0.05)', 
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Why Choose This Product
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Premium quality and durability
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Advanced features and technology
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Excellent customer reviews and ratings
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        {product.warranty || 'Manufacturer warranty included'}
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Fast shipping and easy returns
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Product Specifications
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      gutterBottom
                      sx={{ fontWeight: 600, color: 'primary.main' }}
                    >
                      Basic Information
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
                          <Typography variant="body2" color="text.secondary">
                            Brand
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="body2" fontWeight={500}>
                            {product.brand || 'Premium Brand'}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={5}>
                          <Typography variant="body2" color="text.secondary">
                            Category
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="body2" fontWeight={500}>
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={5}>
                          <Typography variant="body2" color="text.secondary">
                            Warranty
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="body2" fontWeight={500}>
                            {product.warranty || '1 Year Manufacturer Warranty'}
                          </Typography>
                        </Grid>
                        
                        {product.colors && (
                          <>
                            <Grid item xs={5}>
                              <Typography variant="body2" color="text.secondary">
                                Available Colors
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography variant="body2" fontWeight={500}>
                                {product.colors.join(', ')}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      gutterBottom
                      sx={{ fontWeight: 600, color: 'primary.main' }}
                    >
                      Technical Specifications
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                      {product.specifications ? (
                        <Grid container spacing={2}>
                          {product.specifications.map((spec, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={5}>
                                <Typography variant="body2" color="text.secondary">
                                  {spec.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography variant="body2" fontWeight={500}>
                                  {spec.value}
                                </Typography>
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                      ) : (
                        <Typography variant="body2">
                          Detailed specifications not available for this product.
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Package Contents
                </Typography>
                <Typography variant="body2">
                  1 x {product.title}, User Manual, Warranty Card
                </Typography>
              </Box>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Customer Reviews
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  mb: 4,
                  p: 3,
                  bgcolor: 'rgba(107, 102, 255, 0.05)',
                  borderRadius: 2,
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    mr: { sm: 6 },
                    mb: { xs: 3, sm: 0 },
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {product.rating}
                  </Typography>
                  <Rating value={product.rating} precision={0.5} readOnly size="large" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {product.reviews ? `${product.reviews.length} reviews` : 'Based on customer reviews'}
                  </Typography>
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Rating Breakdown
                  </Typography>
                  
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Calculate percentage for each star rating
                    const reviewsForStar = product.reviews 
                      ? product.reviews.filter(review => Math.floor(review.rating) === star).length 
                      : 0;
                    const percentage = product.reviews 
                      ? (reviewsForStar / product.reviews.length) * 100 
                      : star === Math.floor(product.rating) ? 100 : 0;
                    
                    return (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 40 }}>
                          {star} star
                        </Typography>
                        <Box 
                          sx={{ 
                            flexGrow: 1, 
                            mx: 1, 
                            height: 8, 
                            bgcolor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: `${percentage}%`, 
                              height: '100%', 
                              bgcolor: star > 3 ? 'success.main' : star > 1 ? 'warning.main' : 'error.main',
                              borderRadius: 4,
                            }} 
                          />
                        </Box>
                        <Typography variant="body2" sx={{ minWidth: 40 }}>
                          {reviewsForStar || 0}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {product.reviews && product.reviews.length > 0 ? (
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Customer Feedback
                  </Typography>
                  
                  {product.reviews.map((review, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{ 
                        p: 3, 
                        mb: 2, 
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {review.user}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {review.comment}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" paragraph>
                    No reviews yet. Be the first to review this product.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Write a Review
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
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
                  backgroundColor: 'primary.main',
                },
              }}
            >
              Related Products
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/products/${product.category}`)}
              sx={{ 
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(107, 102, 255, 0.08)',
                },
              }}
            >
              View All
            </Button>
          </Box>
          
          <Fade in={true} timeout={1000}>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item key={relatedProduct.id} xs={12} sm={6} md={3}>
                  <ProductCard product={relatedProduct} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Box>
      )}

      {/* Add to Cart Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {quantity > 1 
            ? `${quantity} items added to your cart!` 
            : 'Item added to your cart!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;