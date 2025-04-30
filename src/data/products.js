// Sample product data
export const products = [
  // Electronics Category
  {
    id: 'e1',
    title: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 799.99,
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    category: 'electronics',
    rating: 4.5,
    stock: 15,
    featured: true,
  },
  {
    id: 'e2',
    title: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    category: 'electronics',
    rating: 4.7,
    stock: 8,
    featured: true,
  },
  {
    id: 'e3',
    title: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    category: 'electronics',
    rating: 4.3,
    stock: 20,
    featured: false,
  },
  {
    id: 'e4',
    title: 'Smart TV 55"',
    description: '4K Ultra HD Smart TV with voice control',
    price: 699.99,
    image: 'https://via.placeholder.com/300x200?text=SmartTV',
    category: 'electronics',
    rating: 4.6,
    stock: 10,
    featured: true,
  },
  {
    id: 'e5',
    title: 'Digital Camera',
    description: 'Professional digital camera with 4K video',
    price: 899.99,
    image: 'https://via.placeholder.com/300x200?text=Camera',
    category: 'electronics',
    rating: 4.4,
    stock: 7,
    featured: false,
  },

  // Mobile Category
  {
    id: 'm1',
    title: 'iPhone 13',
    description: 'Apple iPhone with A15 Bionic chip',
    price: 899.99,
    image: 'https://via.placeholder.com/300x200?text=iPhone',
    category: 'mobiles',
    rating: 4.8,
    stock: 12,
    featured: true,
  },
  {
    id: 'm2',
    title: 'Samsung Galaxy S21',
    description: 'Samsung flagship with 108MP camera',
    price: 849.99,
    image: 'https://via.placeholder.com/300x200?text=Samsung',
    category: 'mobiles',
    rating: 4.6,
    stock: 15,
    featured: true,
  },
  {
    id: 'm3',
    title: 'Google Pixel 6',
    description: 'Google phone with advanced AI features',
    price: 749.99,
    image: 'https://via.placeholder.com/300x200?text=Pixel',
    category: 'mobiles',
    rating: 4.5,
    stock: 9,
    featured: false,
  },
  {
    id: 'm4',
    title: 'OnePlus 9 Pro',
    description: 'Flagship killer with Hasselblad camera',
    price: 799.99,
    image: 'https://via.placeholder.com/300x200?text=OnePlus',
    category: 'mobiles',
    rating: 4.4,
    stock: 11,
    featured: false,
  },
  {
    id: 'm5',
    title: 'Xiaomi Mi 11',
    description: 'Powerful smartphone with 120Hz display',
    price: 699.99,
    image: 'https://via.placeholder.com/300x200?text=Xiaomi',
    category: 'mobiles',
    rating: 4.3,
    stock: 14,
    featured: false,
  },

  // Other products can be added here
];

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