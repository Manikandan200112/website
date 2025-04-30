import React from 'react';
import { 
  Box, 
  Grid, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  TextField,
  Fade,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts, getTopRatedProducts, getDiscountedProducts, getNewArrivals } from '../data/enhanced-products';
import ProductCard from './ProductCard';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[800],
  color: '#fff',
  marginBottom: theme.spacing(6),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  height: { xs: 400, md: 500 },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
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
    backgroundColor: theme.palette.primary.main,
  },
}));

// Category cards data
const cards = [
  {
    id: 1,
    title: 'Electronics',
    description: 'Explore our range of premium electronics and gadgets.',
    link: '/products/electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    title: 'Mobile Phones',
    description: 'Discover the latest smartphones and accessories.',
    link: '/products/mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    title: 'Clothing',
    description: 'Stylish apparel for every occasion and season.',
    link: '/products/clothing',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const EnhancedHomeBody = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const topRatedProducts = getTopRatedProducts(4);
  const discountedProducts = getDiscountedProducts().slice(0, 4);
  const newArrivals = getNewArrivals(4);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80)`,
          borderRadius: 4,
          overflow: 'hidden',
          height: { xs: 400, md: 500 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.4)',
          }}
        />
        <Grid container>
          <Grid item md={7} xs={12}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 4, md: 6 },
                pr: { md: 0 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography 
                component="h1" 
                variant="h2" 
                color="inherit" 
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 3,
                }}
              >
                Discover Premium Products
              </Typography>
              <Typography 
                variant="h5" 
                color="inherit" 
                paragraph
                sx={{ 
                  mb: 4,
                  maxWidth: 600,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                Explore our curated collection of high-quality products at competitive prices. Find exactly what you need with our easy shopping experience.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/products')}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                    boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                      boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
                    },
                    fontWeight: 600,
                  }}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => navigate('/products')}
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    borderRadius: 2,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    fontWeight: 600,
                  }}
                >
                  View Deals
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Categories Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <SectionTitle 
            variant="h4" 
            component="h2"
          >
            Shop by Category
          </SectionTitle>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
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
        
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(card.link)}
                  sx={{ height: '100%' }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={card.image}
                      alt={card.title}
                      sx={{ 
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '20px',
                      }}
                    >
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        sx={{ 
                          fontWeight: 700,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <SectionTitle 
            variant="h4" 
            component="h2"
          >
            Featured Products
          </SectionTitle>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
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
            {featuredProducts.slice(0, 4).map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Box>

      {/* Promotional Banner */}
      <Paper
        sx={{
          p: 0,
          mb: 8,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box 
          sx={{ 
            flex: 1, 
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #6B66FF 0%, #4834DF 100%)',
            color: 'white',
          }}
        >
          <Typography 
            variant="h4" 
            component="h3" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Special Offer
          </Typography>
          <Typography 
            variant="h6"
            sx={{ mb: 3, opacity: 0.9 }}
          >
            Get 20% off on all electronics products
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 500 }}>
            Limited time offer! Use code <b>SUMMER20</b> at checkout to receive your discount on our premium selection of electronics.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products/electronics')}
            sx={{ 
              alignSelf: 'flex-start',
              py: 1.5,
              px: 4,
              borderRadius: 2,
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              fontWeight: 600,
            }}
          >
            Shop Electronics
          </Button>
        </Box>
        <Box 
          sx={{ 
            flex: 1,
            display: { xs: 'none', md: 'block' },
            backgroundImage: 'url(https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 400,
          }}
        />
      </Paper>

      {/* New Arrivals Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <SectionTitle 
            variant="h4" 
            component="h2"
          >
            New Arrivals
          </SectionTitle>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
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
            {newArrivals.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Box>

      {/* Top Rated Products */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <SectionTitle 
            variant="h4" 
            component="h2"
          >
            Top Rated Products
          </SectionTitle>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
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
            {topRatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Box>

      {/* Deals & Discounts */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
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
                backgroundColor: 'secondary.main',
              },
            }}
            color="secondary"
          >
            Deals & Discounts
          </Typography>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => navigate('/products')}
            sx={{ 
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.08)',
              },
            }}
          >
            View All Deals
          </Button>
        </Box>
        
        <Fade in={true} timeout={1000}>
          <Grid container spacing={3}>
            {discountedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      </Box>

      {/* Newsletter Subscription */}
      <Paper
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h3" 
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Subscribe to Our Newsletter
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 4,
            color: 'text.secondary',
          }}
        >
          Stay updated with our latest products, exclusive offers, and shopping tips. Subscribe to our newsletter for a 10% discount on your next purchase.
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{ 
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            placeholder="Enter your email address"
          />
          <Button 
            variant="contained" 
            type="submit"
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
              boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
              '&:hover': {
                background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
              },
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EnhancedHomeBody;