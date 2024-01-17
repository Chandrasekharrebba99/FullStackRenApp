import { useState,useEffect } from "react";
import TopNavbar from "../TopNavbar"
import Navbar from "../Navbar"
import PropertyCard from "../PropertyCard"
import PropertyCardInfo from "../PropertCardInfo";
import Slider from "react-slick";
import './index.css'

// const PropertyDetails =[{
//     property_id:5,
//     PropertyUserID:"CH12",
//     propertyFirstName:"Aravindh",
//     PropertyLastName:"Verma",
//     features:"3 BHK 4th floor",
//     propertyImageURL:"image",
//     pincode:507112,
//     city:"Raidurgam",
//     state:"Rangareddy",
//     country:"India",
//     unitSize:5,
//     UnitRentValue:25000,
// },
// ]

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


const Home =(props)=>{
   // Window.prototype
  const [PropertyDetails, setData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  


  
  const countries = ['USA', 'India', 'UK','Australia'];
  const states = ['Telangana', 'Maharastra', 'Kerala', 'Karnataka','California','Sydney','London'];
  const cities = ['west minister', 'New town', 'San francisco', 'Thiruvunanthapuram','Mumbai','Hyderabad'];

  
  

  useEffect(() => {
    // Define your async function to fetch data
    const fetchData = async () => {
      try {
        // Perform your API request or any asynchronous operation
        const response = await fetch('http://192.168.1.59:8000/unitlistview/');
        const result = await response.json();

        // Update the state with the fetched data
        const realData = result.map((arr) => ({
          propertyId: arr.unit_data.property_id,
          propertyUserId: arr.owner_details.user_id,
          propertyOwnerFirstName: arr.owner_details.firstname,
          propertyOwnerLastName: arr.owner_details.lastname,
          features: arr.property_data.features,
          propertyImageURL: arr.property_data.propertyimage_link,
          pincode: arr.property_data.pincode,
          addressline1:arr.property_data.addressline1,
          city: arr.property_data.city,
          state: arr.property_data.state,
          country: arr.property_data.country,
          unitRentValue: arr.unit_data.rent_value,
          unitID:arr.unit_data.unit_id,
          createdAt:arr.unit_data.created_at,
          unitBHKSize:arr.unit_data.unit_bhk_size,
        }));
        console.log(realData)

        setData(realData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; // Call the fetchData function
    fetchData();
  },[]);

  

 

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

    return(
        <div>
            <TopNavbar/>
            <Navbar/>
            <div className="top-div-explore">
                <div className = "explore-top-div">
                    <div className="explore-top-div-description-box">
                    🏡 Welcome to our premier apartment rental platform! Discover your ideal
                     living space with our user-friendly application. Browse through a diverse
                     selection of flats tailored to your preferences and budget. Enjoy hassle-free
                     searching, detailed property listings, and seamless communication with landlords.
                     Whether you're looking for a cozy studio or a spacious family home, our application
                     makes finding the perfect flat a breeze. Elevate your living experience with us – your
                     key to unlocking the door to your new home awaits! 🌟.
                    </div>
                    <div>
                    <h1>Explore Our apartment rentals</h1>
                    </div>
                    {/*  */}
    <div className="filter-container">
      <div className="filter-section">
        <label><strong>Country:</strong></label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label><strong>State:</strong></label>
        <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label><strong>City:</strong></label>
        <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        
      </div>
      
      
    </div>
    <div>
    </div>
        <div className="all-cards">
        <ul className="d-flex">
          {PropertyDetails.map((propertyDetails) =>
            (selectedCity === "" || propertyDetails.city.includes(selectedCity)) &&
              (selectedState === "" || propertyDetails.state.includes(selectedState)) &&
              (selectedCountry === "" || propertyDetails.country.includes(selectedCountry)) ? (
              <PropertyCardInfo propertyDetails={propertyDetails} key={propertyDetails.id} />
            ) : null
          )}
        </ul>
            </div>
        </div>
                
      </div>
    </div>
    )
}

export default Home









