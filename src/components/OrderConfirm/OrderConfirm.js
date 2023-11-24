import React from 'react'
import './OrderConfirm.css'

const OrderConfirm = () => {
  return (
    
    <div className='order__container'>
        <h4>Orders<span style={{textDecoration:"underline", marginLeft:20}}>    Order 32457ABC</span> </h4>
       <div className='order-info'>
        <h3 style={{fontSize:25}}>Order 32457ABC</h3>
        <div>
            <button className='back-btn'>Back</button>
            <button className='approve-btn'>Approve order</button>
        </div>
        </div>
    </div>
    
    
  )
}

export default OrderConfirm