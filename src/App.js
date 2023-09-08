import './App.scss';
import {Routes, Route, Link} from "react-router-dom";
import Register from './Components/Register';
import Login from "./Components/Login";
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Admin from './Components/Admin';
import User from './Components/User';
import { useState } from 'react';

const showLoader = () => {
  document.querySelector(".lds-ring").classList.remove("none");
}
const hideLoader = () => {
  document.querySelector(".lds-ring").classList.add("none");
}

//registerhanlder for handling the registering of the user 
const registerHandler = async(e,role,navigate,setLoggedIn) => {
  e.preventDefault();
  try{
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
    const reg = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`,{
      name,
      password,
      email,
      role
    });

    Cookies.set("token",reg.data.token);
    toast.success("Registration successful");

    // eslint-disable-next-line
    if(reg.data.role == 'admin'){
      navigate("/loan-request-admin");
      }
      else{
       navigate("/user/request");
      }

      setLoggedIn(true);


    
  }catch(err){
    if(err.response){
        toast.error(err.response.data.message);
    }
    else{
      toast.error("Internal server Error");
    }
  }
}

const loginHandler = async(e,navigate,setLoggedIn) => {
  e.preventDefault();
  try{
     const email = e.target[0].value;
     const password = e.target[1].value;

     const log = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`,{
      email,
      password
     })

     Cookies.set("token",log.data.token);
     toast.success("Login successful");

    // eslint-disable-next-line
    if(log.data.role == 'admin'){
      navigate("/loan-request-admin");
      }
      else{
       navigate("/user/request");
      }
      setLoggedIn(true);

  }catch(err){
    if(err.response){
      toast.error(err.response.data.message);
    }
    else{
      console.log(err)
      toast.error("Internal Server Error");
    }
  }
}

//function for logging out of the website 
const logoutHandler = (setLoggedIn) => {
  Cookies.remove("token");
  toast.success("Logout Successfully");
  setLoggedIn(false);
}


function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  return (
    <>
    <div style={{backgroundColor:"black"}} className="lds-ring none"><div></div><div></div><div></div><div></div></div>
    {loggedIn ?  <Link to={"/"} className='logout'  onClick={() => (logoutHandler(setLoggedIn))} >Logout</Link> : <div></div>}
   <Routes>
    <Route path='/' element = {<Register setLoggedIn= {setLoggedIn} showLoader={showLoader} hideLoader={hideLoader} registerHandler = {registerHandler}/>}/>
    <Route path='/login' element = {<Login setLoggedIn = {setLoggedIn} showLoader={showLoader} hideLoader={hideLoader} loginHandler = {loginHandler}/>}/>
    <Route path='/loan-request-admin' element={<Admin showLoader={showLoader} hideLoader={hideLoader}/>}/>
    <Route path='/user/*' element = {<User showLoader={showLoader} hideLoader={hideLoader}/>} />
   </Routes>
   </>
  );
 

}

export default App;
