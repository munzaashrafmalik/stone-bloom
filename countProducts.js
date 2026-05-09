import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function countProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const totalProducts = await Product.countDocuments();
    console.log(`\n📦 Total Products: ${totalProducts}`);

    // Count by category
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    console.log('\n📊 Products by Category:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} products`);
    });

    // Featured and on sale
    const featured = await Product.countDocuments({ isFeatured: true });
    const onSale = await Product.countDocuments({ isOnSale: true });

    console.log(`\n⭐ Featured Products: ${featured}`);
    console.log(`🔥 On Sale Products: ${onSale}`);

    // Total stock
    const stockInfo = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$stock' }
        }
      }
    ]);

    if (stockInfo.length > 0) {
      console.log(`\n📦 Total Stock Available: ${stockInfo[0].totalStock} items`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

countProducts();
