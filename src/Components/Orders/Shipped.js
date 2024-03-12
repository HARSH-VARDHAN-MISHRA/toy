import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shipped = () => {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://motion-63l4.onrender.com/api/v1/admin-order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter orders with status 'Delivered'
      const deliveredOrders = response.data.data.filter((item) => item.orderStatus === 'Delivered');
      
      setOrders(deliveredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Shipped Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created At</th>
            <th>Order Status</th>

            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.orderStatus}</td>

              <td>
                <ul className="text-left border-2">
                  {order.product.map((product) => (
                    <li key={product._id}>
                      <strong>{product.name}</strong> - <br /> Quantity: {product.quantity}, Price: {product.price}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shipped;
