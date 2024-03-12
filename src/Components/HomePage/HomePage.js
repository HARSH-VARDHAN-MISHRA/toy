import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Chart from './Chart';
const HomePage = () => {
  const [length,setlength]= useState(0)
  const [Plength,setPlength]= useState(0)

  const [product, setProduct] = useState()
  const handleFetch = async () => {

    try {
      const response = await axios.get(
        'https://motion-63l4.onrender.com/api/v1/all-product');


      // console.log(response.data.data);
      setProduct(response.data.data)
      setPlength(response.data.data.length)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    handleFetch()
  }, [])
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://motion-63l4.onrender.com/api/v1/getAllUser');
           
            // console.log(response.data)
            setlength(response.data.length);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUsers();
}, []);

  // Mock data (you should replace this with actual data from your API)
  const salesTotal = 5000;
  const totalProducts = 150;


  return (
    <div className="">
      <h2 className='head-h2'>Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"><i className=" bigtext ri-money-dollar-circle-line"></i><br /> Total Orders</h5>
              <p className="card-text">{salesTotal}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"><i className=" bigtext ri-archive-line"></i> <br /> Total Products</h5>
              <p className="card-text">{totalProducts}</p>
            </div>
          </div>
        </div>
        {/* <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"><i className=" bigtext ri-user-line"></i> <br /> Total Users</h5>
              <p className="card-text">{length}</p>
            </div>
          </div>
        </div> */}
      </div>
      <div>
        <Chart length={length} Plength={Plength}/>
      </div>
      {/* Remix Icons CDN Link */}
    </div>
  );
};

export default HomePage;
