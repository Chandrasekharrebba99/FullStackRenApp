import TopNavbar from "../TopNavbar"
import OrdersCard from "../OrdersCard"
import Navbar from "../Navbar"
import './index.css'
import { useState,useEffect } from "react"

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

const Orders=()=>{
    const [data, setData] = useState([])
    const currentUrl = window.location.href;
    const userId = currentUrl.split("/").slice(-1)[0]
    const datatosend = {
        "tenant_id":userId
    }

    useEffect(() => {
        const postData = async () => {
          try {
            const response = await fetch(`http://192.168.1.59:8000/tntuntdata/${userId}`);
            const result = await response.json();
    
            if (response.status == 200) {
                console.log(result)
                setData(result)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        postData();
  }, []);

    return(
        <>
        <TopNavbar/>
        <Navbar/>
        <div className="orders-top-div"> 
        <div>
            <h1>Property that You Rent</h1>
        </div>
            <ul>
                {data.map((arr,i)=><OrdersCard key={i} arr={arr}/>)}
            </ul>
        </div>
        
    </>
    
    )
}

export default Orders