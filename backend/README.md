<<<<<<< HEAD
# 💎 Stone & Bloom - Premium Jewelry E-Commerce

A complete MERN stack jewelry e-commerce website with **Admin Panel**, **Pakistani prices (PKR)**, and **modern features**.

## 📁 Project Structure

```
pakistani-store/
├── backend/                 # Node.js + Express Backend
│   ├── models/             # MongoDB Models
│   ├── routes/             # API Routes
│   ├── middleware/         # Auth Middleware
│   ├── server.js           # Express Server
│   ├── seeder.js           # Database Seeder
│   └── .env                # Environment Variables
│
└── frontend/               # React.js Frontend
    ├── src/
    │   ├── components/     # Reusable Components
    │   ├── pages/          # Page Components
    │   ├── context/        # React Context (Auth, Cart, Wishlist)
    │   ├── api/            # API Integration
    │   ├── utils/          # Helper Functions
    │   └── App.jsx         # Main App Component
    └── package.json
```

## 🚀 Features

### Customer Features
- ✅ User Registration & Login
- ✅ Product Browsing with Filters & Search
- ✅ Shopping Cart
- ✅ Wishlist
- ✅ Quick View Modal
- ✅ Checkout with COD
- ✅ Order Tracking
- ✅ Newsletter Popup
- ✅ Size Guide
- ✅ Recently Viewed Products
- ✅ Responsive Design

### Admin Features
- ✅ Admin Dashboard with Statistics
- ✅ Product Management (Add, Edit, Delete)
- ✅ Order Management with Status Updates
- ✅ User Management
- ✅ Low Stock Alerts

### Payment
- ✅ **Cash on Delivery (COD)**
- ✅ Free shipping on orders above Rs. 5,000

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Install MongoDB

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service

**Or use MongoDB Atlas (Cloud):**
1. Visit [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string

### 2. Setup Backend

```bash
cd pakistani-store/backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB connection string

# Seed database with sample products
npm run seed

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Setup Frontend

```bash
cd pakistani-store/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🔐 Default Admin Credentials

```
Email: admin@stoneandbloom.com
Password: admin123
```

## 📦 Sample Products

The seeder includes 62+ jewelry products:
- **Earrings** (21 products) - Korean, Pearl, Zircon, Crystal
- **Rings** (20 products) - Silver, Gold, Platinum
- **Necklaces** (21 products) - Pendants, Chains, Pearl

All prices are in **Pakistani Rupees (PKR)**.

## 🌟 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/pay` - Update payment status

### Users
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## 🎨 Customization

### Add More Products
Run the seeder again or add products via Admin Panel.

## 📱 Pages

### Public Pages
- `/` - Homepage
- `/products` - Products listing
- `/products/:id` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/login` - Login page
- `/register` - Registration page
- `/orders` - User orders
- `/orders/:id` - Order details
- `/faq` - FAQs

### Admin Pages
- `/admin` - Dashboard
- `/admin/products` - Products management
- `/admin/products/add` - Add product
- `/admin/products/edit/:id` - Edit product
- `/admin/orders` - Orders management
- `/admin/users` - Users management

## 🔧 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js

### Frontend
- React.js 18
- React Router v6
- Axios
- React Context API
- React Toastify
- React Icons
- Vite

## 📞 Contact

- **Email:** stone.bloom09@gmail.com
- **Phone:** 0336-6840648
- **Location:** Saddar, Karachi, Pakistan

## 📄 License

This project is created for educational/demo purposes.

---

**Made with ❤️ in Pakistan**

**Stone & Bloom - Where Elegance Meets Affordability**
=======
# stone_bloom
>>>>>>> 06901111374a0fd7aaa5b95c37026255ba4f5d64
