// Navbar.js
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css'; // You can style your components in Navbar.css

const Header = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <img
          src="https://reeco.io/assets/logo.44b75468.svg"
          alt="Logo"
          className="logo"
        />
        <div className="nav-items">
          <span>Store</span>
          <span>Orders</span>
          <span>Analytics</span>
        </div>
      </div>
      <div className="right-section">
        <div style={{backgroundColor:"#10b981", height:15,width:15,borderRadius:25, textAlign:'center',fontSize:10,marginTop:"-10px",zIndex:100}}>0</div>
        <FaShoppingCart className="cart-icon" />
        <div className="user-info">
          <span>Hello, <span className="user-name">James</span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
