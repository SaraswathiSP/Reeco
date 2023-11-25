import styled from 'styled-components';

export const OrderContainer = styled.div`
  padding: 5px 100px 5px 100px;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.15);
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -20px;
`;

export const H4 = styled.h4`
  color: #78716c;
`;

export const H3 = styled.h3`
  color: #1c1917;
`;

export const BackButton = styled.button`
  text-align: center;
  border-radius: 20px;
  color: #064e3b;
  border: 2px solid #064e3b;
  margin-right: 15px;
  height: 42px;
  width: 80px;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
`;

export const ApproveButton = styled.button`
  background-color: #064e3b;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  height: 42px;
  width: 150px;
  font-weight: bold;
  cursor: pointer;
`;
