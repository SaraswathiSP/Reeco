import React from 'react';


import {NavbarContainer,LeftSection, Logo, NavItems, NavItem, RightSection, CartIcon, UserInfo,UserName } from './HeaderStyled.js'



const Header = () => {
  return (
    <NavbarContainer>
      <LeftSection>
        <Logo
          src="https://reeco.io/assets/logo.44b75468.svg"
          alt="Logo"
        />
        <NavItems>
          <NavItem>Store</NavItem>
          <NavItem>Orders</NavItem>
          <NavItem>Analytics</NavItem>
        </NavItems>
      </LeftSection>
      <RightSection>
        <div style={{ backgroundColor: "#10b981", height: 15, width: 15, borderRadius: 25, textAlign: 'center', fontSize: 10, marginTop: "-10px", zIndex: 100 }}>0</div>
        <CartIcon />
        <UserInfo>
          <span>Hello, <UserName>James</UserName></span>
        </UserInfo>
      </RightSection>
    </NavbarContainer>
  );
};

export default Header;
