import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#333', margin:'30px' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link>
      <Link to="/contactus" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
    </nav>
  );
};

export default Navbar;
