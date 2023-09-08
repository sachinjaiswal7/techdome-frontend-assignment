import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

//function for handling the adding of the loan request.
const addRequestHandler = async(e,setLoanRequests) => {
  e.preventDefault();
  try{
    const amount = e.target[0].value;
    const term = e.target[1].value;
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/loan/request`,{
      amount,
      term
    },{
      headers : {
        Authorization : `"Bearer ${Cookies.get("token")}`
      }
    })

    const pending = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/pending`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("token")}`
      }
    });
    setLoanRequests(pending.data.pending);

    e.target[0].value = "";
    e.target[1].value = "";

    toast.success("Now create an admin account and login from it and approve the loan request to make repayment of loan");



  }catch(err){
    if(err.response){
      toast.error(err.response.data.message);
    }
    else{
      toast.error("Internal Server error");
    }
  }
}
const Request = ({showLoader,hideLoader}) => {
    const [loanRequests,setLoanRequests] = useState([]);

    useEffect(() => {
      showLoader();
      const pendingData = async() => {
        try{  
            const pending = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/pending`,{
              headers : {
                Authorization : `Bearer ${Cookies.get("token")}`
              }
            });
            setLoanRequests(pending.data.pending);
        }catch(err){
          console.log(err)
        }
      }
      pendingData();
      hideLoader();

      // eslint-disable-next-line 
    },[]);
    
      return (
        <div className="request-page">
          <div style={{display : "flex", justifyContent:"space-between", alignItems:"center", marginBottom : 10}} className='adder'>
           <h2>Loan Requests</h2>
          <form onSubmit={(e) => {
            showLoader();
            addRequestHandler(e,setLoanRequests)
            hideLoader();
            }} className='add-request' >
            <input type="number" required min={"1"} max={"100000000000"} placeholder='Amount' />
            <input type="number" required min={"1"} max={"50"} placeholder='Term' />
            <button style={{backgroundColor:"#FFCE32",color:'black'}}>Add Loan Request</button>
          </form>
          </div>

          <div className="loan-requests">
            {loanRequests.map((request, index) => (
              <div className="loan-request" key={index}>
                <div className="request-info">
                  <p><b>Loan ID</b>: {request._id}</p>
                  <p><b>Amount</b>: ${request.amount}</p>
                  <p><b>Term</b>: {request.term} weeks</p>
                  <p><b>Date</b>: {request.createdAt.split("T")[0]}</p>
                </div>
                <div className="request-status">
                  <p>Status: {request.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Request