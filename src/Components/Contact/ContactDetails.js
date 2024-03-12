import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactDetails = () => {
  const [contactDetailsList, setContactDetailsList] = useState([]);

  useEffect(() => {
    // Fetch contact details
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get('https://motion-63l4.onrender.com/api/v1/getContact');
        setContactDetailsList(response.data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <div className="container mt-5">
    <h2>Contact Details</h2>
    {Array.isArray(contactDetailsList) && contactDetailsList.length > 0 ? (
      contactDetailsList.reverse().map((contactDetails, index) => (
        <div key={index} className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">{contactDetails.Name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {contactDetails.Email}<br />
              <strong>Phone Number:</strong> {contactDetails.PhoneNumber}<br />
              <strong>Message:</strong> {contactDetails.Message}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>Loading contact details...</p>
    )}
  </div>
  );
};

export default ContactDetails;
