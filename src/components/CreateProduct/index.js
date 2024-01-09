import { useState } from 'react';
import TopNavbar from "../TopNavbar"
import { v4 as uuidv4 } from 'uuid';
import Navbar from "../Navbar"
import './index.css'

import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={667} width={375} />
);


const countries = ['USA', 'Canada', 'India'];
const states = ['New York', 'California', 'Ontario', 'London'];
const cities = ['New York City', 'Los Angeles', 'Toronto', 'London'];

const CreateProduct = ()=>{
    const [isloading, setisloading] = useState(false);
    const [isdatasubmited, setisdatasubmited] = useState(false)
    const [propertyId, setPropertyId] = useState('');
    const [propertyOwnerId, setPropertyOwnerId] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [features, setFeatures] = useState('');
    const [country1, setCountry] = useState('');
    const [state1, setState] = useState('');
    const [city1, setCity] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [pincode, setPincode] = useState('');
    const [unitSize, setUnitSize] = useState(0);
    const [rentValue, setRentValue] = useState('');
    const [bhksize, setbhksize] = useState("");
    const currentUrl = window.location.href;
    const userId = currentUrl.split("/").slice(-1)[0]

    const handleSubmit = async(e) => {
      setisloading(true)
        e.preventDefault();
        // You can use the input values as needed, for example, send them to an API, etc.
        const Property = {
          property_id:uuidv4(),
          property_owner_id:userId,
          features:features,
          propertyimage_link:imageFile,
          addressline1:addressLine1,
          pincode:pincode,
          state:state1,
          country:country1,
          city:city1,
          unit_size: unitSize,
          unit_bhk_size:bhksize,
          rent_value:rentValue,
        }
        console.log(Property)

        const test1 = {
        "property_id": "78assdvsdc9",
        "features": "temple",
        "propertyimage_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshDqNLhgDbCoGZi_qFnGba5Wo1fNYq7kHSuLG3qNn5Q&s",
        "addressline1": "Near AJA",
        "pincode": 500032,
        "city": "hyd",
        "state": "hh",
        "country": "hjj",
        "property_owner_id": "1",
        "unit_size":45,
        "rent_value":40000,
        "unit_bhk_size":"3BHK"
    }
       
        
        try {
          const response = await fetch('http://192.168.1.59:8000/prodata/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Property),
          });
          console.log(response.status)
      
            if (response.status === 201) {
              // Redirection
              setisdatasubmited(true)
              console.log('Data sent successfully.');
              
            }else if(response.status === 205){
              // redirect to home
            }else {
              console.error('Error sending data.');
            }
          } catch (error) {
            console.error('Error:', error);
        }
        
        setisloading(false)
      };

    return(
    <> <TopNavbar/>
    <Navbar/>
   
    <div className="property-form-container">
      {isdatasubmited ? <h1 className='DataSubmitedH1'>Data Submited successfully</h1>:<form onSubmit={handleSubmit} className='create-form-property'>
        <div className='d-f-c'>
        <label className="form-label">
          Property Image URL:
          <input type="text" className="form-file" onChange={(e) => setImageFile(e.target.value)} />
        </label>

        <label className="form-label">
          Features:
          <input type="text" className="form-input" value={features} onChange={(e) => setFeatures(e.target.value)} />
        </label>

        <label className="form-label">
          Country:
          <select value={country1} onChange={(e) => setCountry(e.target.value)}>
            <option>Select</option>
            <option>USA</option>
            <option>India</option>
            <option>Australia</option>
            <option>UK</option>
          </select>
        </label>

        <label className="form-label">
          State:
          <select value={state1} onChange={(e) => setState(e.target.value)} >
          <option>Select</option>
            <option>Telangana</option>
            <option>Maharastra</option>
            <option>Kerala</option>
            <option>Karnataka</option>
            <option>California</option>
            <option>Sydney</option>
            <option>London</option>
          </select>
          
        </label>
        <label className="form-label">
          City:
          <select  value={city1} onChange={(e) => setCity(e.target.value)}  >
          <option>Select</option>
            <option>Hyderabad</option>
            <option>Mumbai</option>
            <option>Thiruvunanthapuram</option>
            <option>Bangalore</option>
            <option>San francisco</option>
            <option>New town</option>
            <option>west minister</option>
          </select>
          
        </label>

        <label className="form-label">
          Address Line:
          <textarea rows={4} cols={3}type="text" className="form-input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} >
          </textarea>
        
        </label>
        </div>
        <div className='d-f-c'>

        <label>
          select BHK size:
        <select onChange={(e)=>{setbhksize(e.target.value)}}>
          <option>1BHK</option>
          <option>2BHK</option>
          <option>3BHK</option>
          <option>4BHK</option>
          <option>5BHK</option>
        </select>
        </label>
        

        <label className="form-label">
          Pincode:
          <input type="text" className="form-input" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </label>

        <label className="form-label">
          Unit Size:
          <input type="text" className="form-input" value={unitSize} onChange={(e) => setUnitSize(e.target.value)} />
        </label>

        <label className="form-label">
          Rent Value:
          <input type="text" className="form-input" value={rentValue} onChange={(e) => setRentValue(e.target.value)} />
        </label>

        <button type="submit" className="form-button">Submit</button>
        </div>
       

        
      </form>}
      
      {isloading && <div className="loadingspinner">
          <Loading />
        </div> }
      
       
    </div>
    </>
    )
}

export default CreateProduct