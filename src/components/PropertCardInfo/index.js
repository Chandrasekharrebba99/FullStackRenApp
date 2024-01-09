// PropertyCard.js

import React, { useState } from 'react';
import ReactLoading from 'react-loading';
 

import './index.css';

const Loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

const PropertyCardInfo = ({ propertyDetails }) => {
    const [isloading, setisloading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleStartDateChange = (event) => {
      const selectedDate = event.target.valueAsDate;
      setStartDate(selectedDate);
    };
  
    const handleEndDateChange = (event) => {
      const selectedDate = event.target.valueAsDate;
      setEndDate(selectedDate);
    };
   
    
    const handlebuybutton = async(e)=>{
        const currentUrl = window.location.href;
        const userId = currentUrl.split("/").slice(-1)[0]
        const unitId = e.target.value

        const formattedDate1 = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
        const formattedDate2 = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
        
        const postDate = {
            "start_date":formattedDate1,
            "end_date":formattedDate2,
            "tenent_id":userId,
            "rent_value":propertyDetails.unitRentValue,
            "units":propertyDetails.unitID
        }
        console.log(postDate)
        
        try {
            const response = await fetch('http://192.168.1.59:8000/tenanatdata', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // You might need additional headers depending on your API requirements
              },
              body: JSON.stringify(postDate),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const responseData = await response.json();
            console.log('POST response:', responseData);
            // Handle the response data as needed
          } catch (error) {
            console.error('Error making POST request:', error);
            // Handle errors
          }
    }

  return (
    <div className="property-card">
      <div>
      <img src={propertyDetails.propertyImageURL} alt="Property" className="property-image" />
      <p>{`${propertyDetails.addressLine1}, ${propertyDetails.city}, ${propertyDetails.state}, ${propertyDetails.country} - ${propertyDetails.pincode}`}</p>

      </div>
    
      <div className="property-details">
      <h3>{propertyDetails.propertyOwnerFirstName} {propertyDetails.propertyOwnerLastName}</h3>

        <p>{propertyDetails.features}</p>
        <p>{`Rent: $${propertyDetails.unitRentValue}`}</p>
        {/* <p>{`Size: ${propertyDetails.unitSize} sq. ft`}</p> */}
        <p>{`Created At: ${propertyDetails.createdAt}`}</p>
        <p>Unit_BHK_SIZE:{propertyDetails.unitBHKSize}</p>
        <div>
     
      <label>Start Date: </label>
      <input value={startDate ? startDate.toISOString().split('T')[0] : ''} type='date' onChange={handleStartDateChange} />
      <br />
      <label>End Date: </label>
      <input value={endDate ? endDate.toISOString().split('T')[0] : ''} type='date' onChange={handleEndDateChange} />
      
      {/* Other components using startDate and endDate */}
              
            </div>
            <button className='Buy-Now-Button' onClick={handlebuybutton} value={propertyDetails.propertyId}>Rent Now</button>

      </div>
    </div>
  );
};

export default PropertyCardInfo;
