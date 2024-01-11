import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getAnalytics } from "firebase/analytics";

import { signInWithPopup } from "firebase/auth";

import { v4 as uuidv4 } from 'uuid';
import TopNavbar from "../TopNavbar";

import { useHistory } from 'react-router-dom';
import { useState } from "react";



import { Link, withRouter,Navigate } from 'react-router-dom';


import {getAuth,GoogleAuthProvider,getAdditionalUserInfo} from 'firebase/auth'
import './index.css'

import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={667} width={375} />
);

const firebaseConfig = {
  apiKey: "AIzaSyAuMJq1e7iJ40gEllbsfZZjJGiki1Mguo8",
  authDomain: "freebaba-6dea0.firebaseapp.com",
  projectId: "freebaba-6dea0",
  storageBucket: "freebaba-6dea0.appspot.com",
  messagingSenderId: "482177714547",
  appId: "1:482177714547:web:ed4ece402dc27392fa5d06",
  measurementId: "G-F1BE4HEFPH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




const Login = () => {
    
    const [Gdata, setGdata] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [userexist, setUserexit] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmitForm = (e) => {
        e.preventDefault();
     
        console.log('Registration data:', formData);
        
      };
   
    const handleSubmit = async(Gdata) => {
     
      setisloading(true)
      const {createdat,uid,googleProPic,email} = Gdata;
    
      const dataToSend = {createdat,uid,googleProPic,email}

      const data1 = {user_id:uuidv4(),firstname:formData.firstName,lastname:formData.lastName,
        email:formData.email,password:formData.password,created_at:"2024-01-08"}

      const d1 = {
        "user_id":"75","firstname":"sdvDfvdf","lastname":"SDvsd","email":"sd@gmail.com","password":"Sfvsdvfsv","created_at":"2024-01-08T12:00:00Z"
      }

      console.log(data1)
      
      
      try {
          const response = await fetch('http://192.168.1.59:8000/create_user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
          });
          console.log(response,"sdc")
      
          if (response.status === 201) {
            localStorage.setItem('user_id', data1.user_id);
            // Redirection
            const link = `/profile/${data1.user_id}`
            window.location.href = link;
            console.log('Data sent successfully.');
          }else if(response.status === 205){
           
          }else {
            console.error('Error sending data.');
          }
        } catch (error) {
          console.error('Error:', error);
      }
      console.log('Form data submitted:');
      setisloading(false)
    };

    const handleSignIn = async(Gdata) => {

      setisloading(true)
      const {createdat,uid,googleProPic,email} = Gdata;
      
      
      const dataToSend = {createdat,uid,googleProPic,email}
      const data1 = {email:formData.email,password:formData.password}
      console.log(data1)
      try {
          const response = await fetch('http://192.168.1.59:8000/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1),
          });
          const res = await response.json(); // Use await to get the JSON data

          console.log(res, "res");
      
          if (res.user_id) {
            // Redirection
            localStorage.setItem('user_id', res.user_id);
            const link = `/profile/${res.user_id}`
            
            window.location.href = link;
            console.log('Data sent successfully.');
            
          }else if(response.status === 205){
            // redirect to home
          }else {
            console.error('Error sending data.');
          }
        } catch (error) {
          console.error('Error:', error);
      }
      console.log('Form data submitted:');
      setisloading(false)
    };
   
   
 

    const handleGoogleSignIn = async () => {
      
      console.log("Handle Google button")
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
  
      try {
      
        const result = await signInWithPopup(auth, provider);
        console.log(result)
  
       
        const Gdata1 = {
          name: result.user.displayName,
          createdate: result.user.metadata.creationTime,
          email: result.user.email,
          uid: result.user.uid,
          googleProPic: result.user.photoURL,
        };

        const isuserExist =  handleSubmit(Gdata1)
  
       
     
        console.log('Google Sign-In Success');
        setGdata(Gdata1);
       
      } catch (error) {
     
        console.error('Google Sign-In Error:', error);
      }
    };


    return (
      <>
      <TopNavbar/>
      <div className="topcont">
      
        
        <div className="middlecont">
          <div>
          
          {isSignIn ? (
              <button onClick={() => setIsSignIn(false)}>Sign Up</button>
            ) : (
              <button onClick={() => setIsSignIn(true)}>Sign In</button>
            )}
            <p>*Dont have account please register* </p>
          </div>
          {isSignIn ? (<form className="registration-form">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChangeForm}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChangeForm}
                required
              />
            </label>
            <button type="button" onClick={handleSignIn}>Sign in</button>
          </form>) : <form className="registration-form" onSubmit={handleSubmitForm}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChangeForm}
          required
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChangeForm}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChangeForm}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChangeForm}
          required
        />
      </label>

      <button type="button" onClick={handleSubmit}>Register</button>
    </form>}
    
          
        </div> 
 
        {isloading && <Loading/>}
        
      </div>
      </>
    );
  };
  
  export default Login;
