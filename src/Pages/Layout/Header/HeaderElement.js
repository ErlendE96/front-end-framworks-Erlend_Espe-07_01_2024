import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon/CartIcon';
import { useCart } from '../../CheckoutPage/CartContext/CartContext';

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.length;

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <header>
            <Link to="/">
        <h2 className='navheaderh2'>eCom</h2>
      </Link>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`nav-links ${mobileMenuVisible ? 'visible' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
      </nav>
      <Link to="/checkout">
        <CartIcon itemCount={itemCount} />
      </Link>
    </header>
  );
}

export default Header;
