import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import WebAppBar from '../components/Appbar';

// Styled components
const ErrorIcon = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 107, 107, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 32px',
}));

const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 4,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '6px',
                background: 'linear-gradient(90deg, #FF6B6B, #FF9E80)',
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '5rem', md: '8rem' },
                    color: 'secondary.main',
                    lineHeight: 1,
                    mb: 2,
                  }}
                >
                  404
                </Typography>
                
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Page Not Found
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
                  Oops! The page you are looking for might have been removed, had its name changed, 
                  or is temporarily unavailable.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/home')}
                    sx={{ 
                      px: 3, 
                      py: 1.2,
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #6B66FF, #4834DF)',
                      boxShadow: '0 4px 15px rgba(107, 102, 255, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #5A55EE, #3723CE)',
                        boxShadow: '0 6px 20px rgba(107, 102, 255, 0.6)',
                      },
                    }}
                  >
                    Go to Home
                  </Button>
                  
                  <Button 
                    variant="outlined"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={() => navigate('/products')}
                    sx={{ 
                      px: 3, 
                      py: 1.2,
                      borderRadius: 2,
                    }}
                  >
                    Browse Products
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box 
                  component="img" 
                  src="https://cdn-icons-png.flaticon.com/512/6195/6195678.png" 
                  alt="404 Illustration"
                  sx={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    maxHeight: 400,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              If you believe this is an error, please contact our support team.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default NotFoundPage;