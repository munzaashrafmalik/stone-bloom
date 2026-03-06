import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bridal Sets', 'Anklets', 'Brooches', "Men's Jewelry", "Kids Jewelry", 'Watches', 'Chokers', 'Hair Clips', 'Men Fashion', 'Women Fashion', 'Electronics', 'Home & Living', 'Sports', 'Beauty', 'Kids', 'Accessories']
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  brand: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
