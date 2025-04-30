import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  Chip,
  CardActions,
  IconButton,
  Snackbar,
  Alert,
  Skeleton,
  Tooltip,
  styled
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
    '& .product-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ProductImageWrapper = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
});

const ProductImage = styled(CardMedia)({
  height: 200,
  transition: 'transform 0.5s ease',
});

const ProductActions = styled(Box)({
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  opacity: 0,
  transform: 'translateY(-10px)',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  zIndex: 1,
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '4px 12px',
  borderTopRightRadius: 16,
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
}));

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarMessage('Added to cart!');
    setSnackbarOpen(true);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    setSnackbarMessage(favorite ? 'Removed from favorites' : 'Added to favorites!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledCard>
        <ProductImageWrapper>
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              height={200} 
              animation="wave" 
              sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)' }}
            />
          )}
          <ProductImage
            component="img"
            image={product.image}
            alt={product.title}
            onLoad={() => setImageLoaded(true)}
            sx={{ display: imageLoaded ? 'block' : 'none' }}
          />
          <ProductActions className="product-actions">
            <Tooltip title="Add to favorites" arrow placement="left">
              <ActionButton 
                size="small" 
                color={favorite ? "secondary" : "default"}
                onClick={handleToggleFavorite}
              >
                {favorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
              </ActionButton>
            </Tooltip>
            <Tooltip title="Quick view" arrow placement="left">
              <ActionButton 
                size="small"
                onClick={handleViewDetails}
              >
                <VisibilityIcon />
              </ActionButton>
            </Tooltip>
          </ProductActions>
          <PriceTag>
            ${product.price.toFixed(2)}
          </PriceTag>
        </ProductImageWrapper>
        
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Chip 
              label={product.category} 
              size="small" 
              sx={{ 
                fontSize: '0.7rem', 
                height: 20, 
                backgroundColor: 'rgba(107, 102, 255, 0.1)',
                color: 'primary.main',
                fontWeight: 600,
              }} 
            />
          </Box>
          
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.3,
              height: '2.6rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.75rem' }}>
              ({product.rating})
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1.5, 
              height: '3em', 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.85rem',
            }}
          >
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              label={product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'} 
              color={product.stock > 0 ? 'success' : 'error'} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 24 }}
            />
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            fullWidth
            variant="contained" 
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            sx={{ 
              borderRadius: 2,
              py: 1,
              background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
              '&:hover': {
                background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
              },
              '&.Mui-disabled': {
                background: '#e0e0e0',
              },
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </StyledCard>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;