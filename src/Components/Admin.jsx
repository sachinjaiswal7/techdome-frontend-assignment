import React, { useState } from 'react'
import AdminRequest from './AdminRequest'
import { useNavigate } from 'react-router-dom'
import  { useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'

const Admin = ({showLoader,hideLoader}) => {
  const navigate = useNavigate();
  const [requestData,setRequestData] = useState([]);
  useEffect(()=>{
    if(!Cookies.get("token")){
      navigate("/");
    }
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    showLoader();
    const request = async() => {
      try{
      const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/allPending`,{
        headers : {
          Authorization : `Bearer ${Cookies.get("token")}`
        }
      })
      console.log(data);
      setRequestData(data.data.pending);
    }catch(err){
      if(err.response){
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
    }
    request();
    hideLoader();
    // eslint-disable-next-line
  },[]);
  return (
    <>
    {requestData && requestData.length > 0 ? requestData.map((item,index) => {
      return <AdminRequest showLoader={showLoader} hideLoader = {hideLoader} name = {item.name} amount={item.amount} loanId={item._id} key={index} term={item.term} setRequestData = {setRequestData}/>
    }):<div style={{textAlign:"center"}}>No Loan request has been made yet</div>}
  
   </>
  )
}

export default Admin