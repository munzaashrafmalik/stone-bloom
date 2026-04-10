import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import QuickViewModal from './components/QuickViewModal';
import SizeGuideModal from './components/SizeGuideModal';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import FAQ from './pages/FAQ';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Don't expose in render
  if (typeof window !== 'undefined') {
    window.setQuickViewProduct = setQuickViewProduct;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <Router>
              <div className="app">
                <Header />
                <CartSidebar />
                <main>
                  <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Protected Routes */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/orders/:id" element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/products/add" element={
                  <AdminRoute>
                    <AdminAddProduct />
                  </AdminRoute>
                } />
                <Route path="/admin/products/edit/:id" element={
                  <AdminRoute>
                    <AdminEditProduct />
                  </AdminRoute>
                } />
                <Route path="/admin/orders" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />

                {/* 404 Route */}
                <Route path="*" element={
                  <div style={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <div>
                      <h1 style={{ fontSize: '100px', color: '#b76e79', marginBottom: '20px' }}>404</h1>
                      <p style={{ fontSize: '24px', color: '#666', marginBottom: '30px' }}>Page Not Found</p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                  </div>
                } />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer position="top-right" autoClose={3000} />

                {/* Modals */}
                <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
                <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
              </div>
            </Router>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
