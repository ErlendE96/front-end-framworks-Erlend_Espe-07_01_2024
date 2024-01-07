import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Layout/Header/SearchBar/SearchBar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.noroff.dev/api/v1/online-shop');

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);


    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
<div>
    <h1>eCom Store</h1>
  <SearchBar onSearch={handleSearch} />
  <ul className="product-list">
    {filteredProducts.map(product => (
      <li key={product.id} className="product-card">
        <div className="product-content">
          <div className="product-image">
            <img src={product.imageUrl} alt={product.image} />
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.title}</h3>
            {product.discountedPrice !== undefined && (
              <>
                <p className="product-price">Price: ${(Number(product.discountedPrice).toFixed(2))}</p>
                {product.price !== product.discountedPrice && (
                  <p className="product-discount">
                    Discount: ${(Number(product.price - product.discountedPrice).toFixed(2))} ({((product.price - product.discountedPrice) / product.price * 100).toFixed(2)}% off)
                  </p>
                )}
              </>
            )}
          </div>
          <div className="product-actions">
            <Link to={`products/${product.id}`}>
              <button>View Product</button>
            </Link>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>





  );
};

export default ProductPage;
