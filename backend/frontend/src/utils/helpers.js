// Format price in PKR
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate star rating
export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push('★');
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push('☆');
    } else {
      stars.push('☆');
    }
  }
  return stars.join('');
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Validate Pakistani phone number
export const validatePhone = (phone) => {
  const pattern = /^0[0-9]{10}$/;
  return pattern.test(phone);
};

// Get category icon
export const getCategoryIcon = (category) => {
  const icons = {
    'Men Fashion': '👔',
    'Women Fashion': '👗',
    'Electronics': '📱',
    'Home & Living': '🏠',
    'Sports': '⚽',
    'Beauty': '💄',
    'Kids': '🧸',
    'Accessories': '👜'
  };
  return icons[category] || '📦';
};
