import { useState,useEffect } from 'react';
import './index.css'

const OrderInfo  ={
    propertyownerId:12,
    firstName:"Ajay",
    lastName:"Boopathi",
    email:"C@gmail.com",
    features:"3 BHK 4 th floor",
    propertyImageUrl:"https://assets-news.housing.com/news/wp-content/uploads/2021/11/17123339/Kerala-house-design-Different-types-of-traditional-houses-in-Kerala-Roofs.jpg",
    location_id:"s",
    addressline1:"Back side of keshav reddy sweets",
    country:"India",
    state:"Hydrabad",
    city:"raidurg",
    pincode:243532,
    created_at:"02/05/2022",
    rent_value:25000,
    tenant_rent_value:50000
}

const OrdersCard=(props)=>{
     // Empty dependency array means this effect will run once when the component mounts
    const {arr} = props
    console.log("new arr",arr)
    
    return(
        <div className="custom-card">
        <div className="card-header">
          <h2>Property Information</h2>
        </div>
        <div className="card-body">
          <p className="address-line"><strong>Address Line 1:</strong> {arr.addressline1}</p>
          <p><strong>Email:</strong> {arr.email}</p>
          <p><strong>Start Date:</strong> {arr.start_date}</p>
          <p><strong>End Date:</strong> {arr.end_date}</p>
          <p><strong>First Name:</strong> {arr.firstname}</p>
          <p><strong>Last Name:</strong> {arr.lastname}</p>
          <p><strong>Rent Value:</strong> {arr.rent_value}</p>
          <p><strong>Unit Rent Value:</strong> {arr.unit_rent_value}</p>
        </div>
      </div>
    )
}

export default OrdersCard