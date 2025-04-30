// import { Box, Grid } from '@mui/material';
// import React from 'react';
// import backgroundImage from '../assets/images/bg1.jpg';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';

// const cards = [
//   {
//     id: 1,
//     title: 'Plants',
//     description: 'Plants are essential for all life.',
//   },
//   {
//     id: 2,
//     title: 'Animals',
//     description: 'Animals are a part of nature.',
//   },
//   {
//     id: 3,
//     title: 'Humans',
//     description: 'Humans depend on plants and animals for survival.',
//   },
// ];

// const HomeBody = () => {
//   const [selectedCard, setSelectedCard] = React.useState(0);

//   return (
//     <Box 
//       sx={{ 
//         flexGrow: 1, 
//         background: 'linear-gradient(to right, rgb(165, 204, 247), rgb(236, 245, 136))',
//         backgroundImage: `url(${backgroundImage})`, 
//         backgroundSize: 'cover', 
//         backgroundPosition: 'center',
//         display: 'grid', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         padding: 0,
//         marginTop: 0
//       }}
//     >
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           {cards.map((card, index) => (
//             <Card 
//               key={card.id}
//               sx={{ 
//                 minWidth: 275, 
//                 margin: '10px', 
//                 flexGrow: 1, 
//                 display: 'flex', 
//                 marginTop: 'auto' 
//               }}
//             >
//               <CardActionArea
//                 onClick={() => setSelectedCard(index)}
//                 data-active={selectedCard === index ? '' : undefined}
//                 sx={{
//                   height: '100%',
//                   '&[data-active]': {
//                     backgroundColor: 'action.selected',
//                     '&:hover': {
//                       backgroundColor: 'action.selectedHover',
//                     },
//                   },
//                 }}
//               >
//                 <CardContent sx={{ height: '100%' }}>
//                   <Typography variant="h5" component="div">
//                     {card.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {card.description}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </Grid>
        
//         <Grid item xs={4}>
//           <div style={{ padding: '0px', marginTop: '300px' }}>
//             <h1>Welcome to the Home Page</h1>
//             <p>This is the content of the home page.</p>
//           </div>
//         </Grid>
        
//         <Grid item xs={4}>
//           {/* Additional content can go here */}
//         </Grid>
        
//         <Grid item xs={8}>
//           {/* Additional content can go here */}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HomeBody;

// // export default HomeBody;

import React from 'react';
import { Box, Grid, useTheme, useMediaQuery, Button } from '@mui/material';
import backgroundImage from '../assets/images/bg1.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts, getTopRatedProducts, getDiscountedProducts, getNewArrivals } from '../data/enhanced-products';
import ProductCard from './ProductCard';

const cards = [
  {
    id: 1,
    title: 'Electronics',
    description: 'Explore our range of electronics and gadgets.',
    category: 'electronics',
    image: 'https://via.placeholder.com/300x200?text=Electronics'
  },
  {
    id: 2,
    title: 'Mobiles',
    description: 'Discover the latest smartphones and accessories.',
    category: 'mobiles',
    image: 'https://via.placeholder.com/300x200?text=Mobiles'
  },
  {
    id: 3,
    title: 'All Products',
    description: 'Browse our complete collection of products.',
    category: '',
    image: 'https://via.placeholder.com/300x200?text=All+Products'
  },
];

const HomeBody = () => {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const theme = useTheme();
  const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  const handleCardClick = (index, category) => {
    setSelectedCard(index);
    navigate(`/products${category ? `/${category}` : ''}`);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: 'linear-gradient(to right, rgb(43, 60, 79), rgb(236, 245, 136))',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(8), // Add padding to account for the fixed AppBar
        marginTop: theme.spacing(8), // Add margin to prevent content from being hidden behind AppBar
      }}
    >
      <Grid container spacing={3}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 2,
              color: 'white',
              mb: 4,
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Flipcart
            </Typography>
            <Typography variant="h6" paragraph>
              Discover amazing products at unbeatable prices
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
              onClick={() => navigate('/products')}
              sx={{ mt: 2 }}
            >
              Shop Now
            </Button>
          </Box>
        </Grid>

        {/* Category Cards Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 3 }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardClick(index, card.category)}
                    sx={{ height: '100%' }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.title}
                      sx={{ height: 140, width: '100%', objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Featured Products Section */}
        <Grid item xs={12} sx={{ mt: 6 }}>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            borderRadius: 2, 
            p: 3,
            mb: 4
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4">Featured Products</Typography>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/products')}
              >
                View All
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Call to Action Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: 'center',
              py: 5,
              px: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 2,
              color: 'white',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Ready to start shopping?
            </Typography>
            <Typography variant="body1" paragraph>
              Explore our wide range of products and find exactly what you need.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={() => navigate('/products')}
            >
              Browse All Products
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeBody;


// import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
// import React from 'react';
// import backgroundImage from '../assets/images/bg1.jpg';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';

// const cards = [
//   {
//     id: 1,
//     title: 'electronics',
//     description: 'electronics are essential for all life.',
//   },
//   {
//     id: 2,
//     title: 'mobiles',
//     description: 'mobiles are a part of nature.',
//   },
//   {
//     id: 3,
//     title: 'Humans',
//     description: 'Humans depend on plants and animals for survival.',
//   },
// ];

// const HomeBody = () => {
//   const [selectedCard, setSelectedCard] = React.useState(0);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         background: 'linear-gradient(to right, rgb(43, 60, 79), rgb(236, 245, 136))',
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         padding: theme.spacing(2),
//       }}
//     >
//       <Grid container spacing={2}>
//         {/* Cards Section */}
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2}>
//             {cards.map((card, index) => (
//               <Grid item xs={12} sm={6} md={4} key={card.id}>
//                 <Card
//                   sx={{
//                     height: '40%',
//                     marginTop:"280px",
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   <CardActionArea
//                     onClick={() => setSelectedCard(index)}
//                     data-active={selectedCard === index ? '' : undefined}
//                     sx={{
//                       height: '100%',
//                       '&[data-active]': {
//                         backgroundColor: 'action.selected',
//                         '&:hover': {
//                           backgroundColor: 'action.selectedHover',
//                         },
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Typography variant="h6" component="div">
//                         {card.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {card.description}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               mt: isSmallScreen ? 6 : 10,
//               marginTop: isSmallScreen ? 0 : '280px',
//               textAlign: isSmallScreen ? 'center' : 'left',
//               p: 2,
//             }}
//           >
//             <Typography variant="h4" gutterBottom>
//               Welcome to the Home Page
//             </Typography>
//             <Typography variant="body1">
//               This is the content of the home page.
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Extra Grid Space (optional content areas) */}
//         <Grid item xs={12} md={4}>
//           {/* Additional content can go here */}
//         </Grid>
//         <Grid item xs={12} md={8}>
//           {/* Additional content can go here */}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default HomeBody;
