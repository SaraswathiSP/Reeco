import {OrderContainer, H4, OrderInfo,H3, BackButton,ApproveButton } from './OrderConfirmStyled.js'

const OrderConfirm = () => {
  return (
    <OrderContainer>
      <H4>
        Orders
        <span style={{ textDecoration: 'underline', marginLeft: 20 }}> Order 32457ABC</span>
      </H4>
      <OrderInfo>
        <H3 style={{ fontSize: 25 }}>Order 32457ABC</H3>
        <div>
          <BackButton>Back</BackButton>
          <ApproveButton>Approve order</ApproveButton>
        </div>
      </OrderInfo>
    </OrderContainer>
  );
};

export default OrderConfirm;
