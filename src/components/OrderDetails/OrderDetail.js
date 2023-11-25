import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import { IoIosClose } from 'react-icons/io';

import './OrderDetail.css'
import { LuCarrot, LuSearch } from "react-icons/lu"
import { GiBeerBottle, GiFruitBowl, GiPirateCoat, GiFlowers, GiFruitTree } from "react-icons/gi"
import { FaRegSnowflake, FaLink } from "react-icons/fa"
import { TbMeat } from "react-icons/tb";


const OrderDetail = () => {
  const [data, setData] = useState([]);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: '',
    brand: '',
    price: '',
    quantity: 0,
  });
  const [searchInput, setSearchInput] = useState('');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    price: '',
    quantity: 0,
  });


  const fetchData = async () => {
    try {
      const response = await fetch('/data.json'); // Update the path accordingly
      const jsonData = await response.json();
      setData(jsonData.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Store data in localStorage whenever it changes
    localStorage.setItem('orderData', JSON.stringify(data));
  }, [data]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  const handleAddItemClose = () => {
    setShowAddItemModal(false);
    setNewProduct({
      name: '',
      brand: '',
      price: '',
      quantity: 0,
      status: 'New',
    });
  };

  const handleAddItemSubmit = () => {
    const newProductWithTotalPrice = {
      ...newProduct,
      total_price: calculateTotalPrice(newProduct.price, newProduct.quantity),
    };

    setData([...data, newProductWithTotalPrice]);

    // Close the modal
    setShowAddItemModal(false);

    setNewProduct({
      name: '',
      brand: '',
      price: '',
      quantity: 0,
    });
  };




  const handleApproval = (id) => {
    // Update status to "approved"
    const updatedData = data.map((product) =>
      product.id === id ? { ...product, status: 'Approved' } : product
    );
    setData(updatedData);
  };

  const handleMissing = (id, productName) => {
    // Show modal for confirmation
    setSelectedProductId(id);
    setShowMissingModal(true);
  };

  const confirmMissing = (isUrgent) => {
    // Update status to "Missing" or "Missing - Urgent" based on user selection
    const updatedData = data.map((product) => {
      if (product.id === selectedProductId) {
        return {
          ...product,
          status: isUrgent ? 'Missing - Urgent' : 'Missing',
        };
      }
      return product;
    });

    setData(updatedData);
    setShowMissingModal(false);
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const renderPrice = (price, newPrice) => {
    if (newPrice) {
      return (
        <div>
          <span style={{ textDecoration: 'line-through', color: 'gray' }}>{price}</span>
          <br />
          <span>{newPrice}</span>
        </div>
      );
    } else {
      return <span>{price}</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Missing - Urgent':
        return 'red';
      case 'Missing':
        return 'orange';
      default:
        return '';
    }
  };

  const getActionColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Missing - Urgent':
        return 'red';
      case 'Missing':
        return 'orange';
      default:
        return '#a1a1aa'; // Default color before any change in status
    }
  };

  const getTiTickColor = (status) => {
    return status === 'Approved' ? 'green' : '#a1a1aa';
  };

  const getIoIosCloseColor = (status) => {
    switch (status) {
      case 'Missing':
        return 'orange';
      case 'Missing - Urgent':
        return 'red';
      default:
        return '#a1a1aa';
    }
  };

  const openEditModal = (product) => {
    setEditProduct({ ...product });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct({
      id: null,
      name: '',
      brand: '',
      price: '',
      quantity: 0,
    });
  };

  const handleEditSend = () => {
    // Update data based on edited values
    const updatedData = data.map((product) => {
      if (product.id === editProduct.id) {
        return {
          ...product,
          price: editProduct.price,
          quantity: editProduct.quantity,
          status: `Updated - ${editProduct.price !== product.price ? 'Price ' : ''}${editProduct.quantity !== product.quantity ? 'Quantity' : ''
            }`,
        };
      }
      return product;
    });

    setData(updatedData);
    setShowEditModal(false);
  };

  const calculateTotalProductsPrice = () => {
    let total = 0;
    data.forEach((product) => {
      total += calculateTotalPrice(product.price.slice(1, product.price.length), product.quantity);
    });
    return total.toFixed(2);
  };

  return (
    <div className='order__details'>
      <div className='cont__1'>
        <div className='detail'>
          <h4>Supplier</h4>
          <h3>East coast fruits<br /> & vegetables</h3>
        </div>
        <div className='line'></div>
        <div className='detail'>
          <h4>Shipping date</h4>
          <h3>Fri, Nov 24</h3>
        </div>
        <div className='line'></div>
        <div className='detail'>
          <h4>Total</h4>
          <h3>${calculateTotalProductsPrice()}</h3>
        </div>
        <div className='line'></div>
        <div className='detail'>
          <h4>Category</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#78716c" }}>
              <LuCarrot style={{ marginRight: 10 }} />
              <GiBeerBottle style={{ marginRight: 10 }} />
              <GiFruitBowl style={{ marginRight: 10 }} />
              <GiPirateCoat />
            </div>
            <div style={{ display: "flex", color: "#78716c", marginTop: 15 }}>
              <GiFlowers style={{ marginRight: 10 }} />
              <GiFruitTree style={{ marginRight: 10 }} />
              <FaRegSnowflake style={{ marginRight: 10 }} />
              <TbMeat />
            </div>
          </div>
        </div>
        <div className='line'></div>
        <div className='detail'>
          <h4>Department</h4>
          <h3>300-444-678</h3>
        </div>
        <div className='line'></div>
        <div className='detail'>
          <h4>Status</h4>
          <h3>Awaiting approvel</h3>
        </div>
      </div>
      <div className='cont__2'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='search-container'>
            <input
              type='search'
              className='search'
              placeholder='Search...'
              value={searchInput}
              onChange={handleSearch}
            />
            <button className='search-icon'><LuSearch /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className='add-btn' onClick={handleAddItem}>
              Add item
            </button>
            <FaLink style={{ fontSize: 30, color: "#064e3b" }} />
          </div>
        </div>

        <div className='product-table'>
          <table>
            <thead>
              <tr>
                <th style={{ width: 300 }}>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb', borderTop: 'none', borderLeft: 'none' }}>
                  <td style={{ width: 300, alignItems: 'center', border: 'none', display: 'flex', borderRight: 'none' }}>
                    <img style={{ height: 25, width: 35, marginRight: 20 }} src={product.image} alt={product.id} />
                    {product.name}
                  </td>
                  <td>{product.brand}</td>
                  <td>{renderPrice(product.price, product.new_price)}</td>
                  <td>{product.quantity} x 6 * 1LB</td>
                  <td>${calculateTotalPrice(product.price.slice(1, product.price.length), product.quantity)}</td>
                  <td>
                    <span className={getStatusColor(product.status)} style={{ borderRadius: 20, textAlign: 'center', padding: '10px' }}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className='actions'>
                      <TiTick
                        style={{ fontSize: 25, color: getTiTickColor(product.status) }}
                        onClick={() => handleApproval(product.id)}
                      />
                      <IoIosClose
                        style={{ fontSize: 25, color: getIoIosCloseColor(product.status) }}
                        onClick={() => handleMissing(product.id, product.name)}
                      />
                      <h3 onClick={() => openEditModal(product)}>
                        Edit
                      </h3>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMissingModal && (
            <div className='modal'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Missing Product</h3>
                <button
                  onClick={() => setShowMissingModal(!showMissingModal)}
                  style={{ border: 'none', backgroundColor: 'transparent', fontSize: '26px', cursor: 'pointer' }}
                >
                  <IoIosClose />
                </button>
              </div>
              <h4>Is '{data.find((product) => product.id === selectedProductId)?.name.slice(0, 32)}...' urgent?</h4>
              <div className='modal-buttons'>
                <button
                  style={{
                    border: 'none',
                    marginRight: 20,
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  onClick={() => confirmMissing(false)}
                >
                  No
                </button>
                <button
                  style={{ border: 'none', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 20 }}
                  onClick={() => confirmMissing(true)}
                >
                  Yes
                </button>
              </div>
            </div>
          )}

          {showEditModal && (
            <div className='modal1'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Edit Product</h3>
                <button
                  onClick={() => closeEditModal()}
                  style={{ border: 'none', backgroundColor: 'transparent', fontSize: '26px', cursor: 'pointer' }}
                >
                  <IoIosClose />
                </button>
              </div>
              <h2 style={{ marginTop: "-10px", fontSize: '18px' }}>{editProduct.name}</h2>
              <p style={{ marginTop: "-15px" }}>{editProduct.brand}</p>
              <div style={{ display: 'flex' }}>
                <img src={editProduct.image} alt="img" style={{ width: 150 }} />
                <div style={{ marginLeft: 30 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: '90px' }}>
                      Price ($) </p>
                    <input style={{ border: "1px solid #a1a1aa", width: 100, height: 40 }}
                      type='text'
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                    <p style={{ marginLeft: 15 }}>/ 6 + 1LB</p>

                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: '85px' }}> Quantity</p>
                    <input style={{ border: "1px solid #a1a1aa", width: 100, height: 40 }}
                      type='number'
                      value={editProduct.quantity}
                      onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                    />
                    <p style={{ marginLeft: 15 }}> x 6 * 1LB</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginRight: '110px' }}>Total</p>
                    <span>{editProduct.price}</span>
                  </div>

                </div>
              </div>
              <p>Choose reason <span style={{ color: "#a1a1aa" }}>(Optional)</span></p>
              <div style={{ display: "flex" }}>
                <p style={{ border: "1px solid #a1a1aa", margin: 10, borderRadius: 25, padding: 10, fontSize: 15, cursor: "pointer" }}>Missing product</p>
                <p style={{ border: "1px solid #a1a1aa", margin: 10, borderRadius: 25, padding: 10, fontSize: 15, cursor: "pointer" }}>Quality is not the same</p>
                <p style={{ border: "1px solid #a1a1aa", margin: 10, borderRadius: 25, padding: 10, fontSize: 15, cursor: "pointer" }}>Price is not the same</p>
                <p style={{ border: "1px solid #a1a1aa", margin: 10, borderRadius: 25, padding: 10, fontSize: 15, cursor: "pointer" }}>Other</p>
              </div>

              <div className='modal-buttons'>
                <button
                  style={{
                    border: 'none',
                    marginRight: 20,
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: "#064e3b"
                  }}
                  onClick={() => closeEditModal()}
                >
                  Cancel
                </button>
                <button
                  style={{ border: 'none', backgroundColor: '#064e3b', fontWeight: 'bold', fontSize: 15, color: "#fff", height: 40, width: 80, borderRadius: 15, textAlign: "center" }}
                  onClick={() => handleEditSend()}
                >
                  Send
                </button>
              </div>
            </div>
          )}


          {showAddItemModal && (
            <div className='modal2'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Add New Item</h3>
                <button
                  onClick={handleAddItemClose}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '26px',
                    cursor: 'pointer',
                  }}
                >
                  <IoIosClose />
                </button>
              </div>

              <input
                type='text'
                placeholder='Product Name'
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type='text'
                placeholder='Brand'
                value={newProduct.brand}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
              />
              <input
                type='text'
                placeholder='Price'
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                type='number'
                placeholder='Quantity'
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
              />
              {/* Add more inputs if needed */}

              <div className='modal-buttons2'>
                <button
                  onClick={() => setShowAddItemModal(false)}
                  style={{
                    border: 'none',
                    marginRight: 20,
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#064e3b',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItemSubmit}
                  style={{
                    border: 'none',
                    backgroundColor: '#064e3b',
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#fff',
                    height: 40,
                    width: 80,
                    borderRadius: 15,
                    textAlign: 'center',
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

      </div>


    </div>
  )
}

export default OrderDetail