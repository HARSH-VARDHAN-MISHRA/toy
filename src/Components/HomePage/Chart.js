import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './chart.css'
import axios from 'axios'
ChartJS.register(ArcElement, Tooltip, Legend);
const Chart = ({length,Plength}) => {
    const [orders, setOrders] = useState([]);
    const [sorders, setsOrders] = useState([]);

    const token = sessionStorage.getItem('token');

    const fetchOrders = async () => {
        try {
          const response = await axios.get('https://motion-63l4.onrender.com/api/v1/admin-order', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const deliveredOrders = response.data.data.filter((item) => item.orderStatus === 'Delivered');
          setsOrders(deliveredOrders.length)
          setOrders(response.data.data.length);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
    useEffect(()=>{
        fetchOrders()
    },[token])
     
    // console.log(length)
    const data = {
        labels: ['users', 'product'],
        datasets: [
          {
            label: '# of Votes',
            data: [Plength,length],
            backgroundColor: [
             
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 1)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      const OrdersAndShipped = {
        labels: ['Shipped', 'Order', ],
        datasets: [
          {
            label: ' # orders',
            data: [orders,sorders],
            backgroundColor: [
             
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              
            ],
            borderColor: [
          
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
  return (
    <div className='chart'>

        <div>
        <Doughnut data={data} />
        </div>
        <div>
        <Doughnut data={OrdersAndShipped} />
        </div>

    </div>
  )
}

export default Chart