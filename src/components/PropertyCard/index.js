import { useState } from 'react';
import './index.css'
const PropertyCard = (props)=>{
    const {arr} = props
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    
    const handlebuybutton = async(e)=>{
        const currentUrl = window.location.href;
        const userId = currentUrl.split("/").slice(-1)[0]
        const unitId = e.target.value

        const postDate = {
            startDate,
            endDate,
            userId,
            unitId
        }
        
        try {
            const response = await fetch('https://example.com/api/endpoint', {
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

    return(
        <div className="property-card">
            <div className='img-cont-div'>
               <img src={arr.propertyImageURL} alt="Property" className="property-image" />
               <p className='address'>{`${arr.city}, ${arr.state}, ${arr.country} - ${arr.pincode}`}</p>
            </div>
        <div className="property-details">
            <h3>{`${arr.propertyOwnerFirstName} ${arr.PropertyOwnerLastName}`}</h3>
            <p>{arr.features}</p>
            <p>{`${arr.unitSize} BHK`}</p>
            <p>{`Rent: ₹${arr.UnitRentValue}`}</p>
            <div>
                <label>Start Date: </label>
                <input value={startDate} type='date' onChange={(date) => setStartDate(date)} />
                <br />
                <label>End Date: </label>
                <input value={endDate} type='date' onChange={(date) => setEndDate(date)} />

                {/* You can use the selected dates for further processing */}
                {startDate && endDate && (
                    <p>
                    Selected Date Range: {startDate.toDateString()} - {endDate.toDateString()}
                    </p>
                )}
            </div>
            <button className='Buy-Now-Button' onClick={handlebuybutton} value={arr.propertyId}>Buy Now</button>
        </div>
    </div>
    )
}

export default PropertyCard