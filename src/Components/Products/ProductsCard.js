import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Productcard = ({ Product }) => {
  const token = sessionStorage.getItem('token');
  const [products, setProducts] = useState(Product);

  useEffect(() => {
    setProducts(Product);
  }, [Product]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://toysbackend.onrender.com/api/v1/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success('Product Deleted');

      // Update the state after successful deletion
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Discount Price</th>
            <th scope='col'>Stock Status</th>
            <th scope='col'>Actions</th>
            <th scope='col'>Tag</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.reverse().map((item, index) => (
              <tr key={index}>
                <td className='w'>
                  <img src={item.productImg[0] || 'No-image'} alt={item.productName}  className='  h ' />
                </td>
                <td>{item.productName}</td>
                <td>{item.Categorey}</td>
                <td>
                  <p>
                    <del>{item.Price}</del> {item.DiscountPrice}%
                  </p>
                </td>
                <td>
                  <em>{item.inStock ? 'In Stock' : 'Out of Stock'}</em>
                </td>
                <td>
                  <div className='mt-3'>
                    <Link to={`/Edit-Product/${item._id}/${item.productName}`} className='btn btn-warning me-2'>
                      Edit Product
                    </Link>
                    <button onClick={() => handleDelete(item._id)} className='btn btn-danger'>
                      Delete Product
                    </button>
                  </div>
                </td>
                <td>
                  <div className='badge bg-primary'>{item.Tag}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  );
};

export default Productcard;
