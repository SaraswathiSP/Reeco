import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px 10px 100px;
  background-color: #064e3b;
  color: white;
  height: 42px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 30px;
  margin-right: 10px;
`;

export const NavItems = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const NavItem = styled.span`
  margin-right: 20px;
  cursor: pointer;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const CartIcon = styled(FaShoppingCart)`
  font-size: 25px;
  margin-right: 40px;
  margin-left: -10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 20px;
`;