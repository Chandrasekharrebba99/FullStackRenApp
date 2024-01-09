import TopNavbar from "../TopNavbar"
import Navbar from "../Navbar"
import Orders from "../Orders"

import { Image, Shimmer } from 'react-shimmer'
import './index.css'
import { useEffect, useState } from "react"

const TenantProfile = {
    user_id: "chanduu",
    firstname:"Chandu",
    lastname:"Rebba",
    created_at : "02/02/2024",
    email : "ch@gmail.com",
    start_date:"02/06/2022",
    end_date:"03/12/2023",
    lastpaymentdate:"02/05/2023"
}



const Profile =(props)=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [data,setData] = useState({})
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        created_at: '',
        email:''
      });
   // Window.prototype

   const handleFileChange = (event) => {
    // Access the selected file from the input event
    const file = event.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);
  };


  useEffect(() => {
    const address = window.location.href.split("/").slice(-1)[0];
    console.log(address);
  
    const fetchData = async () => {
      const userId = 'your_user_id'; // Replace with the actual user ID
  
      try {
        const response = await fetch(`http://192.168.1.59:8000/user_profile/${address}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        // console.log(responseData);
        setUserData(responseData);
        setData(responseData); // Assuming setData is a state update function
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

 
  


     return (
        <>
        <TopNavbar/>
        <Navbar/>
        <div className="top-profile-div">
            <div className="custom-profile-card">
                <div className="custom-cover-photo"></div>
                <div className="custom-profile-pic" fallback={<Shimmer width={500} height={500} />} fallback={<Shimmer width={800} height={600} />}  style={{ backgroundImage: `url('https://www.shutterstock.com/image-photo/headshot-portrait-smiling-young-indian-260nw-1924521005.jpg')` }}></div>
                <div className="custom-info">
                    <h2>{userData.firstname+" "+userData.lastname}</h2>
                    <p>{userData.email}</p>
                    <p>join Date:{userData.created_at}</p>
                    <div className="d-flex1">
                    <p>Document Verification Status:</p>
                    <svg className="greentick-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
</svg>
                    </div>
                    
                </div>
                <div className="validity-div">
                    <div className="validity-div-card">
                        <p>Start Date of rent</p>
                        <p><strong>{TenantProfile.start_date}</strong></p>
                    </div>
                    <div className="validity-div-card">
                        <p>End Date of rent</p>
                        <p><strong>{TenantProfile.end_date}</strong></p>
                    </div>
                    <div className="validity-div-card">
                       <p>Last Payment</p>
                       <p><strong>{TenantProfile.lastpaymentdate}</strong></p>
                    </div>
                </div>
            </div>
            <div className="custom-profile-card documnet-ver-cont">
                <h2>Document Verification:</h2>
            <label>Select File Type:</label>
            <select>
                <option>Adhar Card</option>
                <option>Pan Card</option>
                <option>Driving licence</option>
            </select>
            <br/>
            <label htmlFor="fileInput">Choose a file: </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png, .pdf" // Specify the accepted file types if needed
                    onChange={handleFileChange}
                />
                
            </div>
            <div className="custom-profile-card">
                <Orders/>
            </div>
        </div>
        </>
  );
}

export default Profile