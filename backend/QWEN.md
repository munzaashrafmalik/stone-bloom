# 💎 Stone & Bloom - Cute Aesthetic Jewelry E-Commerce

## 📋 Project Overview

**Stone & Bloom** is a premium, cute aesthetic jewelry e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It specializes in affordable, trendy jewelry pieces targeting young customers who love cute and aesthetic accessories.

### Brand Identity
- **Name:** Stone & Bloom
- **Tagline:** "Where Every Piece Tells a Story"
- **Style:** Cute, Aesthetic, Feminine, Trendy
- **Price Range:** Rs. 350 - Rs. 999 PKR (Affordable luxury)
- **Target Audience:** Young women, teens, jewelry lovers

### Key Features
- ✅ User Authentication (JWT)
- ✅ Product Catalog with Filters & Search
- ✅ Shopping Cart & Checkout
- ✅ JazzCash & Cash on Delivery (COD) Payment
- ✅ Order Management & Tracking
- ✅ Admin Dashboard
- ✅ Product Management (CRUD)
- ✅ User Management
- ✅ Responsive Design
- ✅ Cute Aesthetic UI

---

## 🏗️ Project Structure

```
pakistani-store/
├── backend/                          # Node.js + Express Backend
│   ├── models/                       # MongoDB Schemas
│   │   ├── Product.js               # Product schema with jewelry categories
│   │   ├── User.js                  # User schema with auth, roles
│   │   └── Order.js                 # Order schema with payment, shipping
│   ├── routes/                       # API Routes
│   │   ├── auth.js                  # Login, Register, Profile
│   │   ├── products.js              # Product CRUD, reviews
│   │   ├── orders.js                # Order management
│   │   ├── users.js                 # User management (Admin)
│   │   └── payment.js               # JazzCash integration
│   ├── middleware/
│   │   └── auth.js                  # JWT verification, admin check
│   ├── server.js                    # Express app entry point
│   ├── seeder.js                    # Database seeder (33+ jewelry products)
│   ├── .env                         # Environment variables
│   └── package.json
│
└── frontend/                         # React.js + Vite
    ├── src/
    │   ├── components/              # Reusable Components
    │   │   ├── Header.jsx           # Navigation, search, cart icon (💎 branding)
    │   │   ├── Footer.jsx           # Site footer (Stone & Bloom)
    │   │   ├── CartSidebar.jsx      # Slide-out cart
    │   │   ├── AuthModal.jsx        # Login/Register modal
    │   │   ├── ProtectedRoute.jsx   # Auth route guard
    │   │   └── AdminRoute.jsx       # Admin route guard
    │   ├── pages/                   # Page Components
    │   │   ├── Home.jsx             # Homepage with hero, jewelry categories
    │   │   ├── Products.jsx         # Product listing with filters
    │   │   ├── ProductDetail.jsx    # Single product view
    │   │   ├── Cart.jsx             # Shopping cart page
    │   │   ├── Checkout.jsx         # Checkout with payment
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Register.jsx         # Registration page
    │   │   ├── Orders.jsx           # User order history
    │   │   ├── OrderDetail.jsx      # Order details view
    │   │   └── admin/               # Admin Pages
    │   │       ├── AdminDashboard.jsx
    │   │       ├── AdminProducts.jsx
    │   │       ├── AdminAddProduct.jsx
    │   │       ├── AdminEditProduct.jsx
    │   │       ├── AdminOrders.jsx
    │   │       └── AdminUsers.jsx
    │   ├── context/                 # React Context
    │   │   ├── AuthContext.jsx      # Auth state management
    │   │   └── CartContext.jsx      # Cart state management
    │   ├── api/
    │   │   └── axios.js             # Axios config & API calls
    │   ├── utils/
    │   │   └── helpers.js           # Utility functions (formatPrice in PKR)
    │   ├── App.jsx                  # Main app component
    │   ├── main.jsx                 # React entry point
    │   └── index.css                # Global styles (cute aesthetic theme)
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Quick Start Commands

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm/yarn

### Backend Setup

```bash
cd pakistani-store/backend

# Install dependencies
npm install

# Seed database with jewelry products (first time only)
npm run seed

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Frontend Setup

```bash
cd pakistani-store/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 🔐 Default Credentials

### Admin Account
```
Email: admin@stoneandbloom.com
Password: admin123
```

---

## 🌟 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (filters: category, search, price, sort) | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/:id/review` | Add review | Yes |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create order | Yes |
| GET | `/api/orders/myorders` | Get user orders | Yes |
| GET | `/api/orders/:id` | Get order details | Yes |
| PUT | `/api/orders/:id/pay` | Update payment | Yes |
| PUT | `/api/orders/:id/deliver` | Mark delivered | Admin |
| GET | `/api/orders` | Get all orders | Admin |

### Payment
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payment/jazzcash/initiate` | Initiate JazzCash | Yes |
| POST | `/api/payment/verify` | Verify payment | Yes |
| GET | `/api/payment/status/:orderId` | Get payment status | Yes |

### Users (Admin)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

---

## 🎨 Frontend Routes

### Public Routes
- `/` - Homepage (Hero, Categories, Featured Products)
- `/products` - Products listing with filters
- `/products/:id` - Product detail page
- `/cart` - Shopping cart
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/checkout` - Checkout page
- `/orders` - User orders
- `/orders/:id` - Order details

### Admin Routes
- `/admin` - Dashboard
- `/admin/products` - Products management
- `/admin/products/add` - Add product
- `/admin/products/edit/:id` - Edit product
- `/admin/orders` - Orders management
- `/admin/users` - Users management

---

## 💍 Product Categories

### Main Jewelry Categories
1. **Rings** 💍 - Butterfly, Heart, Pearl, Flower, Star & Moon
2. **Necklaces** 📿 - Butterfly Pendant, Heart Locket, Pearl Drop, Layered Chain
3. **Earrings** ✨ - Butterfly Studs, Heart Hoops, Pearl Drops, Flower Studs
4. **Chokers** 🎀 - Velvet, Pearl, Butterfly, Heart Charm
5. **Hair Clips** 🎗️ - Pearl Clips, Butterfly Clips, Crystal Bobby Pins
6. **Anklets** 👣 - Butterfly, Heart Charm, Pearl, Star & Moon
7. **Bracelets** 🦿 - Butterfly Charm, Heart Beads, Pearl, Flower Charm
8. **Bridal Sets** 👰 - Mini Bridal Sets, Party Jewelry Sets

### Price Range
- **Minimum:** Rs. 350 PKR
- **Maximum:** Rs. 999 PKR
- **Average:** Rs. 600-700 PKR

---

## 💳 Payment Integration

### JazzCash Configuration
Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pakistani-store
JWT_SECRET=pakistani_store_secret_key_2026
NODE_ENV=development

# JazzCash
JAZZCASH_MERCHANT_ID=MC00000
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_salt
JAZZCASH_SANDBOX=true  # false for production
```

### Payment Methods
1. **JazzCash** - Mobile account payment
2. **Cash on Delivery (COD)** - Pay on receipt

### Shipping
- **Free shipping** on orders above Rs. 5,000
- **Rs. 200** shipping fee for orders below Rs. 5,000

---

## 🛠️ Development Conventions

### Code Style
- **Frontend:** React functional components with hooks
- **Backend:** ES6 modules, async/await
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Branding:** Use "Stone & Bloom" consistently

### State Management
- **React Context API** for global state (Auth, Cart)
- **localStorage** for persistence (token, cart)

### Error Handling
- **Backend:** Try-catch with error middleware
- **Frontend:** React Toastify for notifications

### API Response Format
```javascript
// Success
{
  data: {...},
  message: "Success"
}

// Error
{
  message: "Error description",
  errors: [...]  // Validation errors
}
```

---

## 📦 Database Models

### Product Schema (Jewelry Focused)
```javascript
{
  name: String,
  description: String,
  price: Number,           // Rs. 350 - 999
  originalPrice: Number,
  category: String,        // Rings, Necklaces, Earrings, Chokers, Hair Clips, Anklets, etc.
  images: [String],
  stock: Number,
  brand: String,           // "Stone & Bloom"
  rating: Number,
  numReviews: Number,
  sizes: [String],         // Ring sizes
  colors: [String],        // Gold, Silver, Rose Gold, etc.
  isFeatured: Boolean,
  isOnSale: Boolean,
  discount: Number
}
```

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: { street, city, postalCode, country },
  role: String (user/admin),
  wishlist: [ObjectId],
  cart: [{ product, quantity, size, color }]
}
```

### Order Schema
```javascript
{
  user: ObjectId,
  orderItems: [{ product, name, quantity, price, image }],
  shippingAddress: { fullName, phone, street, city, postalCode },
  paymentMethod: String,   // JazzCash, COD
  paymentResult: { id, status, updateTime },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  status: String,          // Pending, Processing, Shipped, Delivered
  trackingNumber: String
}
```

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pakistani-store
JWT_SECRET=pakistani_store_secret_key_2026
NODE_ENV=development

# JazzCash
JAZZCASH_MERCHANT_ID=MC00000
JAZZCASH_PASSWORD=secret
JAZZCASH_INTEGRITY_SALT=salt123
JAZZCASH_SANDBOX=true
```

### Frontend
No environment variables required for local development. API proxy configured in `vite.config.js`.

---

## 🎨 Design Aesthetic

### Color Palette
- **Primary:** Soft Pink (#FFB6C1), Rose Gold (#B76E79)
- **Secondary:** Lavender (#E6E6FA), Mint (#98FF98)
- **Accent:** Gold (#FFD700), Silver (#C0C0C0)
- **Neutral:** White (#FFFFFF), Cream (#FFFDD0)

### Typography
- **Headings:** Modern, rounded sans-serif
- **Body:** Clean, readable sans-serif
- **Accents:** Cursive for special text

### UI Elements
- Rounded corners
- Soft shadows
- Pastel backgrounds
- Cute icons (💎, ✨, 🎀, 💍)
- Hover animations
- Smooth transitions

---

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED ::1:27017
```
**Solution:** 
- Start MongoDB service: `net start MongoDB` (Windows)
- Or use MongoDB Atlas connection string

### Port Already in Use
```
Error: Port 5000/5173 is already in use
```
**Solution:**
- Kill the process using the port
- Or change port in `.env` / `vite.config.js`

### Product Category Validation Error
```
Error: `CategoryName` is not a valid enum value
```
**Solution:**
- Add new category to `backend/models/Product.js` enum array

---

## 📝 Testing

### Manual Testing Checklist
1. Register new user
2. Login with admin credentials
3. Browse jewelry by category
4. Add products to cart
5. Update cart quantities
6. Checkout with COD
7. Checkout with JazzCash (sandbox)
8. View order history
9. Admin: Add/Edit/Delete jewelry products
10. Admin: Update order status
11. Admin: Manage users

---

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Update MongoDB URI to Atlas
3. Deploy with `git push`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API URL to production backend

---

## 📊 Current Inventory

### Product Count by Category
| Category | Products | Price Range (PKR) |
|----------|----------|-------------------|
| Rings | 5 | 350 - 650 |
| Necklaces | 5 | 650 - 900 |
| Earrings | 5 | 400 - 650 |
| Chokers | 4 | 550 - 850 |
| Hair Clips | 4 | 350 - 500 |
| Anklets | 4 | 500 - 650 |
| Bracelets | 4 | 450 - 850 |
| Bridal Sets | 2 | 950 - 999 |

**Total Products:** 33

---

## 📞 Support

- **Email:** support@stoneandbloom.com
- **Phone:** 0800-12345
- **Address:** Main Boulevard, Lahore, Punjab, Pakistan

---

## 📄 License

Educational/Demo purposes only.

---

**Made with 💎✨ in Pakistan**

**Stone & Bloom - Where Every Piece Tells a Story**
