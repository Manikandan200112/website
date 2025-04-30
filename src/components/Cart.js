import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Paper,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const steps = ['Cart Review', 'Shipping Information', 'Payment', 'Confirmation'];

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    alert(`Coupon ${couponCode} applied!`);
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInfoChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    // Process the order
    alert('Order placed successfully!');
    clearCart();
    handleCloseCheckout();
    navigate('/order-confirmation');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Cart
            </Typography>
            <List>
              {cart.items.map((item) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.title} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${cart.totalAmount.toFixed(2)}</Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="State"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name on Card"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInfoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  name="cvv"
                  type="password"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              Thank you for your order! Please review your order details below.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Shipping to:</Typography>
            <Typography variant="body2">
              {shippingInfo.fullName}
              <br />
              {shippingInfo.address}
              <br />
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              <br />
              Phone: {shippingInfo.phone}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Payment Method:</Typography>
            <Typography variant="body2">
              Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Order Total:</Typography>
            <Typography variant="h6">${cart.totalAmount.toFixed(2)}</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 4,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
          }}
        >
          <Box 
            sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              backgroundColor: 'rgba(107, 102, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          </Box>
          
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Your cart is empty
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
            Looks like you haven't added any products to your cart yet. Explore our products and find something you'll love!
          </Typography>
          
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
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Your Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Review your items, adjust quantities, or proceed to checkout
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 4,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Cart Items ({cart.items.length})
            </Typography>
            
            <List sx={{ p: 0 }}>
              {cart.items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    sx={{ 
                      py: 2, 
                      px: 0,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.01)',
                      },
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ 
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar 
                        src={item.image} 
                        alt={item.title} 
                        variant="rounded" 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mr: 2,
                          borderRadius: 2,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }} 
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 0.5,
                            color: 'text.primary',
                          }}
                        >
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography 
                            variant="body2" 
                            color="primary" 
                            sx={{ 
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Category: {item.category}
                          </Typography>
                        </>
                      }
                      sx={{ mr: 2 }}
                    />
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        px: 0.5,
                      }}
                    >
                      <IconButton 
                        size="small" 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: 'text.secondary' }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography 
                        sx={{ 
                          mx: 2,
                          fontWeight: 600,
                          minWidth: 20,
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => addToCart(item)}
                        sx={{ color: 'primary.main' }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        ml: 4, 
                        fontWeight: 700, 
                        minWidth: 80, 
                        textAlign: 'right',
                        color: 'primary.main',
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider component="li" sx={{ my: 1 }} />
                </React.Fragment>
              ))}
            </List>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/products')}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Clear Cart
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 4,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              position: 'sticky',
              top: 100,
              background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                pb: 2,
                borderBottom: '2px solid',
                borderColor: 'primary.main',
                display: 'inline-block',
              }}
            >
              Order Summary
            </Typography>
            
            <Box sx={{ my: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Subtotal ({cart.totalItems} items)
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${cart.totalAmount.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body1" color="success.main" fontWeight={600}>
                  Free
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Tax (10%)
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${(cart.totalAmount * 0.1).toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Total
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={700}
                sx={{ 
                  color: 'primary.main',
                }}
              >
                ${(cart.totalAmount * 1.1).toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Apply Coupon
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter coupon code"
                  variant="outlined"
                  value={couponCode}
                  onChange={handleCouponChange}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                  sx={{ 
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                  boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
                },
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                We accept all major credit cards and PayPal
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Checkout Dialog */}
      <Dialog 
        open={checkoutOpen} 
        onClose={handleCloseCheckout} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
            color: 'white',
            py: 2.5,
          }}
        >
          <Typography variant="h5" component="div" fontWeight={700}>
            Checkout
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
            Complete your purchase by providing the required information
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ px: 4, py: 4 }}>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              pt: 1, 
              pb: 5,
              '& .MuiStepLabel-label': {
                mt: 1,
              },
              '& .MuiStepLabel-label.Mui-active': {
                fontWeight: 700,
                color: 'primary.main',
              },
              '& .MuiStepLabel-label.Mui-completed': {
                fontWeight: 600,
              },
              '& .MuiStepIcon-root.Mui-active': {
                color: 'primary.main',
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: 'success.main',
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ minHeight: 300 }}>
            {getStepContent(activeStep)}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 4, py: 3, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseCheckout}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
            }}
          >
            Cancel
          </Button>
          
          <Box sx={{ flex: 1 }} />
          
          {activeStep > 0 && (
            <Button 
              onClick={handleBack}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                mr: 2,
              }}
            >
              Back
            </Button>
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button 
              variant="contained" 
              onClick={handleNext}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.2,
                background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handlePlaceOrder}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.2,
                background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                },
              }}
            >
              Place Order
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;