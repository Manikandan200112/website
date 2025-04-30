import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Divider,
  Grid,
  Chip,
  Fade,
  styled
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EmailIcon from '@mui/icons-material/Email';
import WebAppBar from '../components/Appbar';
import { useNavigate } from 'react-router-dom';

// Styled components
const SuccessIcon = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 32px',
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: color ? `rgba(${color}, 0.1)` : 'rgba(107, 102, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  useEffect(() => {
    // Create a simple CSS-based confetti animation
    const createConfetti = () => {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
      
      const colors = ['#6B66FF', '#4834DF', '#FF6B6B', '#66D9FF', '#8BC34A'];
      
      // Create 100 confetti particles
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        
        confetti.style.position = 'absolute';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random starting position
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-20px';
        
        // Animation
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        container.appendChild(confetti);
      }
      
      // Add keyframes for the fall animation
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Remove the confetti after animation completes
      setTimeout(() => {
        document.body.removeChild(container);
      }, 5000);
    };
    
    createConfetti();
  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WebAppBar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          pt: 10, 
          pb: 6,
          background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                textAlign: 'center',
                borderRadius: 4,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                mb: 4,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '6px',
                  background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                },
              }}
            >
              <SuccessIcon>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
              </SuccessIcon>
              
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: 'success.main',
                  mb: 2,
                }}
              >
                Order Confirmed!
              </Typography>
              
              <Typography variant="h6" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                Thank you for your purchase. Your order has been received and is being processed.
              </Typography>
              
              <Box 
                sx={{ 
                  my: 4, 
                  py: 3, 
                  px: { xs: 2, md: 5 }, 
                  bgcolor: 'rgba(76, 175, 80, 0.05)', 
                  borderRadius: 3,
                  border: '1px dashed',
                  borderColor: 'success.light',
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        ORDER NUMBER
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {orderNumber}
                      </Typography>
                      
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                        ORDER DATE
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {orderDate}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        ESTIMATED DELIVERY
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {estimatedDelivery}
                      </Typography>
                      
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                        SHIPPING STATUS
                      </Typography>
                      <Chip 
                        label="Processing" 
                        color="primary" 
                        size="medium"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                A confirmation email has been sent to your registered email address with all the order details.
                You can track your order status in the "My Orders" section.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                    boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                      boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
                    },
                  }}
                >
                  Continue Shopping
                </Button>
                
                <Button 
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/home')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Go to Home
                </Button>
              </Box>
            </Paper>
          </Fade>
          
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              mb: 3,
              textAlign: 'center',
            }}
          >
            What happens next?
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <InfoCard>
                <IconWrapper color="107, 102, 255">
                  <ReceiptIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                </IconWrapper>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Order Processing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're preparing your order for shipment. You'll receive updates on the status.
                </Typography>
              </InfoCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <InfoCard>
                <IconWrapper color="76, 175, 80">
                  <LocalShippingIcon sx={{ color: 'success.main', fontSize: 30 }} />
                </IconWrapper>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your order will be shipped within 1-2 business days. You'll receive a tracking number.
                </Typography>
              </InfoCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <InfoCard>
                <IconWrapper color="255, 107, 107">
                  <EmailIcon sx={{ color: 'secondary.main', fontSize: 30 }} />
                </IconWrapper>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Stay Updated
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your email for order updates and shipping notifications.
                </Typography>
              </InfoCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default OrderConfirmationPage;