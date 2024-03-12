import React from 'react'
import Header from '../Header/Header'

import { Routes, Route } from 'react-router-dom'
import CreateProducts from '../Createproducts/CreateProducts'
import AllProducts from '../Products/AllProducts'
import UpdateProducts from '../Products/UpdateProducts'
import DeleteProducts from '../Products/DeleteProducts'
import AllOrders from '../Orders/AllOrders'
import Shipped from '../Orders/Shipped'
import ContactDetails from '../Contact/ContactDetails'
import ChangePassword from '../Auth/ChangePassword'
import HomePage from '../HomePage/HomePage'
import Login from '../Auth/Login'
import UsersTable from '../Auth/UserTable'
import Address from '../Orders/Address'

const Home = () => {
    return (
        <div className='conatiner-fluid  '>
            <div className='row'>
                <div className='col-md-3 heights'>
                    <Header />
                </div>
                <div className='col-md-9 nomt '>
                    <Routes>
                    {/* <Route path='/' element={<HomePage />} /> */}
                    <Route path='/' element={<AllProducts />} />

                        <Route path='/Product' element={<CreateProducts />} />
                        <Route path='/All-Products' element={<AllProducts />} />
                        <Route path='/Edit-Product/:id/:name' element={<UpdateProducts />} />
                        <Route path='/Delete-Products' element={<DeleteProducts />} />
                        <Route path='/Orders' element={<AllOrders />} />
                        <Route path='/Shipped' element={<Shipped />} />
                        <Route path='/contact-details' element={<ContactDetails />} />
                        <Route path='/Change-Password' element={<ChangePassword />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/Users' element={<UsersTable />} />
                        <Route path='/Order-Address/:id' element={<Address />} />
                    
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Home