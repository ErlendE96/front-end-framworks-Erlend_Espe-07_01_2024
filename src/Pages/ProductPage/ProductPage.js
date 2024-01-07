import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CheckoutPage/CartContext/CartContext';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${productId}`);

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          const errorData = await response.json();
          setErrorMessage(`Failed to fetch product: ${errorData.message}`);
        }
      } catch (error) {
        setErrorMessage(`Error fetching product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    setSuccessMessage(`Product added to the cart: ${product.title}`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h2>eCom</h2>
      <ul className="product-list">
        <li key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.imageUrl} alt={product.image} />
          </div>
          <div className="product-details">
            <h3 className="product-title">{product.title}</h3>
            {product.discountedPrice && (
              <>
                <p className="product-price">Price: ${(Number(product.discountedPrice).toFixed(2))}</p>
                {product.price !== product.discountedPrice && (
                  <p className="product-discount">
                    Discount: ${(Number(product.price - product.discountedPrice).toFixed(2))} ({((product.price - product.discountedPrice) / product.price * 100).toFixed(2)}% off)
                  </p>
                )}
              </>
            )}
            <p className="product-description">{product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={goToCheckout}>Go to Checkout</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProductPage;

