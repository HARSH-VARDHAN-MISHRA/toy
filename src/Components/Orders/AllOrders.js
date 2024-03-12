import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem('token');
  const [users, setUsers] = useState([]);

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.post('https://motion-63l4.onrender.com/api/v1/update-order', {
        orderId: id,
        status: status,
      });
      console.log(res.data);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://motion-63l4.onrender.com/api/v1/admin-order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const ordersLength = orders.length
  const getUserDetails = async (orders) => {
    const userIds = orders.map((order) => order.user);

    try {
      const responses = await Promise.all(
        userIds.map((userId) => axios.get(`https://motion-63l4.onrender.com/api/v1/finduserbyid/${userId}`))
      );
      const usersData = responses.map((response) => response.data.data);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    getUserDetails(orders);
  }, [orders]);

  return (
    <div className="container mt-5">
      <h2>All Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Status</th>
            <th>Created At</th>
            <th>Products</th>
            <th>User Name</th>
            <th>User Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const currentUser = users.find((user) => user._id === order.user);
            return (
              <tr key={order._id}>
                <td><Link to={`/Order-Address/${order._id}`}>{order._id}</Link></td>
                <td>
                  {order.orderStatus === 'Delivered' ? (
                    'Order Delivered'
                  ) : (
                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) => changeStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ul className="text-left border-2">
                    {order.product.map((product) => (
                      <li key={product._id}>
                        <strong>{product.name}</strong> - <br /> Quantity: {product.quantity}, Price: {product.price}
                      </li>
                    ))}
                  </ul>
                </td>
                {currentUser && (
                  <>
                    <td>{currentUser.Name}</td>
                    <td>{currentUser.ContactNumber}</td>
                  </>
                )}
                <td>
                  {order.orderStatus === 'Delivered' ? (
                    <button className="btn btn-success" onClick={() => changeStatus(order._id, 'Delivered')}>
                      Deliver
                    </button>
                  ) : (
                    <div className="btn-group">
                      <button
                        className="btn btn-danger"
                        onClick={() => changeStatus(order._id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => changeStatus(order._id, 'Rejected')}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => changeStatus(order._id, 'Delivered')}
                      >
                        Deliver
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
