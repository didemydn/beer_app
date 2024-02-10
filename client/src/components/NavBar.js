import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to = '/'>Home</Link>
      <Link to = '/about'>About</Link>
      <Link to = '/contact'>Contact</Link>
      <Link to = '/user/login'>Login</Link>
    </nav>
  );
}

export default Navbar;