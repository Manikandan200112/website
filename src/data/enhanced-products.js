// Enhanced product data with additional features
import { products } from './products';

// Function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Function to search products
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Function to get top rated products
export const getTopRatedProducts = (limit = 4) => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Function to get discounted products
export const getDiscountedProducts = () => {
  // Filter products that have a discount property
  return products.filter(product => product.discount && product.discount > 0);
};

// Function to get new arrivals
export const getNewArrivals = (limit = 4) => {
  // In a real app, this would filter by date added
  // For this demo, we'll just return some random products
  return [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

// Function to get related products
export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Get products in the same category, excluding the current product
  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== productId
  );
  
  // If we don't have enough related products, add some featured products
  if (relatedProducts.length < limit) {
    const featuredProducts = getFeaturedProducts()
      .filter(p => p.id !== productId && !relatedProducts.find(rp => rp.id === p.id));
    
    return [...relatedProducts, ...featuredProducts].slice(0, limit);
  }
  
  return relatedProducts.slice(0, limit);
};

// Function to get products by brand
export const getProductsByBrand = (brand) => {
  return products.filter(product => 
    product.brand && product.brand.toLowerCase() === brand.toLowerCase()
  );
};

// Add discount property to some products for the discounted products function
// This modifies the imported products array
products.forEach((product, index) => {
  // Add discount to every third product
  if (index % 3 === 0) {
    product.discount = 15; // 15% discount
  }
  
  // Add brand to products
  if (!product.brand) {
    const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus'];
    product.brand = brands[Math.floor(Math.random() * brands.length)];
  }
  
  // Add colors to products
  if (!product.colors) {
    const colors = ['Black', 'White', 'Silver', 'Gold', 'Blue', 'Red'];
    const numColors = Math.floor(Math.random() * 3) + 1; // 1-3 colors
    product.colors = [];
    
    for (let i = 0; i < numColors; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (!product.colors.includes(color)) {
        product.colors.push(color);
      }
    }
  }
  
  // Add sizes to clothing products
  if (product.category === 'clothing' && !product.sizes) {
    product.sizes = ['S', 'M', 'L', 'XL'];
  }
  
  // Add warranty to electronics and mobiles
  if (['electronics', 'mobiles'].includes(product.category) && !product.warranty) {
    product.warranty = '1 Year Warranty';
  }
  
  // Add reviews count
  if (!product.reviews) {
    product.reviews = [];
    const reviewCount = Math.floor(Math.random() * 50) + 5; // 5-54 reviews
    
    for (let i = 0; i < reviewCount; i++) {
      product.reviews.push({
        id: `review-${product.id}-${i}`,
        user: `User${i}`,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: 'This is a sample review comment.',
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      });
    }
  }
});