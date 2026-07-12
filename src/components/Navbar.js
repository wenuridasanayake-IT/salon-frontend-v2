import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // useState + useEffect add kala

function Navbar() {
  const [cartCount, setCartCount] = useState(0); // cart count state

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    };
    
    updateCartCount(); // page load unama 1 para

    // cart eka wena thanaka wenas unaama adala ganne
    window.addEventListener('storage', updateCartCount); 
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="navbar">
      <h1>Salon Wenu</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Products</Link>
      </div>
    </nav>
  );
}

export default Navbar;