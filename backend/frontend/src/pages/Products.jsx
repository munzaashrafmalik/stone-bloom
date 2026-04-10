import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaFilter, FaThLarge, FaList } from 'react-icons/fa';
import { productsAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: searchParams.get('sort') || 'newest'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalProducts: 0 });
  const { addToCart } = useCart();

  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchProducts();
  }, [searchParams, filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: searchParams.get('page') || 1,
        limit: 12,
        ...filters
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products || []);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.sort) params.set('sort', filters.sort);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', sort: 'newest' });
    setSearchParams({});
  };

  const categories = [
    'Men Fashion',
    'Women Fashion',
    'Electronics',
    'Home & Living',
    'Sports',
    'Beauty',
    'Kids',
    'Accessories'
  ];

  const ProductCard = ({ product }) => (
    <div className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`} 
         style={viewMode === 'list' ? { display: 'flex', gridColumn: '1 / -1' } : {}}>
      {product.isOnSale && (
        <span className="product-badge sale">
          -{product.discount || Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
        </span>
      )}
      
      <div className="product-image" style={viewMode === 'list' ? { width: '250px', flexShrink: 0 } : {}}>
        <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
      </div>
      
      <div className="product-info" style={{ flex: 1 }}>
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="rating-count">({product.numReviews} reviews)</span>
        </div>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', display: viewMode === 'list' ? 'block' : 'none' }}>
          {product.description}
        </p>
        <div className="product-price">
          <span className="price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="old-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.stock > 0 ? (
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <button className="add-to-cart-btn" disabled>Out of Stock</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <div className="section">
        <div className="container">
          <div className="page-header" style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
              {searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
            </h1>
            <p style={{ color: '#666' }}>
              {pagination.totalProducts} products found
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
            {/* Filters Sidebar */}
            <aside>
              <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow)', position: 'sticky', top: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <FaFilter />
                  <h3 style={{ fontSize: '18px' }}>Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="form-group">
                  <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="form-group">
                  <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Price Range</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      style={{ flex: 1, padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      style={{ flex: 1, padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="form-group">
                  <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block' }}>Sort By</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <button 
                  className="btn btn-primary btn-block"
                  onClick={applyFilters}
                  style={{ marginBottom: '10px' }}
                >
                  Apply Filters
                </button>
                <button 
                  className="btn btn-outline btn-block"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <main>
              {/* Toolbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setViewMode('grid')}
                    style={{ padding: '8px 15px' }}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setViewMode('list')}
                    style={{ padding: '8px 15px' }}
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
                  <h3>No products found</h3>
                  <p style={{ color: '#666' }}>Try adjusting your filters or search query</p>
                </div>
              ) : (
                <>
                  <div className="products-grid" style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column' } : {}}>
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          className={`btn ${page === pagination.currentPage ? 'btn-primary' : 'btn-outline'}`}
                          onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            params.set('page', page.toString());
                            setSearchParams(params);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{ width: '40px', height: '40px', padding: '0' }}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
