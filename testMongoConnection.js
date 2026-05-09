// Quick MongoDB Connection Test
// Run: node testMongoConnection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));

const testConnection = async () => {
  try {
    console.log('\n⏳ Attempting to connect...');

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log('✅ SUCCESS! MongoDB Connected');
    console.log('📊 Connection Details:');
    console.log('   - Host:', mongoose.connection.host);
    console.log('   - Database:', mongoose.connection.name);
    console.log('   - Ready State:', mongoose.connection.readyState);

    await mongoose.connection.close();
    console.log('\n✅ Connection closed successfully');
    process.exit(0);

  } catch (error) {
    console.log('\n❌ CONNECTION FAILED!');
    console.log('Error Type:', error.name);
    console.log('Error Message:', error.message);

    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.log('\n🔧 SOLUTION:');
      console.log('   1. Check your internet connection');
      console.log('   2. Go to https://cloud.mongodb.com/');
      console.log('   3. Check if your cluster is PAUSED or DELETED');
      console.log('   4. If paused, click RESUME');
      console.log('   5. Get a NEW connection string from Atlas');
      console.log('   6. Update your .env file');
    } else if (error.message.includes('authentication failed')) {
      console.log('\n🔧 SOLUTION:');
      console.log('   1. Check your username and password');
      console.log('   2. Go to Database Access in MongoDB Atlas');
      console.log('   3. Verify user credentials');
    } else if (error.message.includes('IP')) {
      console.log('\n🔧 SOLUTION:');
      console.log('   1. Go to Network Access in MongoDB Atlas');
      console.log('   2. Add IP Address: 0.0.0.0/0 (Allow from anywhere)');
    }

    process.exit(1);
  }
};

testConnection();
