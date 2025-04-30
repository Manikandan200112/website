import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  Button,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

// Styled components
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  display: 'block',
  marginBottom: theme.spacing(1),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Flipcart
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your one-stop destination for all your shopping needs. We offer a wide range of products at competitive prices with excellent customer service.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <SocialButton aria-label="facebook">
                <FacebookIcon />
              </SocialButton>
              <SocialButton aria-label="twitter">
                <TwitterIcon />
              </SocialButton>
              <SocialButton aria-label="instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton aria-label="linkedin">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton aria-label="youtube">
                <YouTubeIcon />
              </SocialButton>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Shop
            </Typography>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); navigate('/products/electronics'); }}>
              Electronics
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); navigate('/products/mobiles'); }}>
              Mobiles
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); navigate('/products/clothing'); }}>
              Clothing
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); navigate('/products/home'); }}>
              Home & Kitchen
            </FooterLink>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>
              All Products
            </FooterLink>
          </Grid>
          
          {/* Customer Service */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Customer Service
            </Typography>
            <FooterLink href="#">
              Contact Us
            </FooterLink>
            <FooterLink href="#">
              FAQs
            </FooterLink>
            <FooterLink href="#">
              Shipping Policy
            </FooterLink>
            <FooterLink href="#">
              Returns & Exchanges
            </FooterLink>
            <FooterLink href="#">
              Privacy Policy
            </FooterLink>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                123 Shopping Street, E-Commerce City, 10001
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <PhoneIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <EmailIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                support@flipcart.com
              </Typography>
            </Box>
            
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                size="small"
                placeholder="Your email"
                fullWidth
                sx={{ 
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: 2,
                  py: 1,
                  background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Bottom Footer */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Flipcart. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: { xs: 2, sm: 0 } }}>
            <FooterLink href="#" sx={{ mx: 1 }}>
              Terms of Service
            </FooterLink>
            <FooterLink href="#" sx={{ mx: 1 }}>
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" sx={{ mx: 1 }}>
              Cookies
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;