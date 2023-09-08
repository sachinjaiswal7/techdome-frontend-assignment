import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import toast from 'react-hot-toast'

const statusHandler = async(loanId,setRequestData,str) => {
  try{
    //updated
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/loan/${str}`,{
      loanId
    },{
      headers : {
        Authorization : `Bearer ${Cookies.get("token")}`
      }
    });



    const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/allPending`,{
      headers : {
        Authorization : `Bearer ${Cookies.get("token")}`
      }
    })
    setRequestData(data.data.pending);

    toast.success("Operation successful");




  }catch(err){
    if(err.response){
      toast.error(err.response.data.message);
    }
    else{
      toast.error("Internal server error");
    }
  }
}
const AdminRequest = ({name,loanId,amount,term,setRequestData,showLoader,hideLoader}) => {
 
  return (
    <div className="loan-request">
    <div className="request-info">
      <h2><b>Loan ID:</b> {loanId}</h2>
      <p><b>Name of requester:</b> {name}</p>
      <p><b>Amount:</b> ${amount}</p>
      <p><b>Term:</b> {term} Weeks </p>
    </div>
    <div className="request-actions">
      <button onClick={() =>{
        showLoader();
        statusHandler(loanId,setRequestData,"approve")
        hideLoader();
        } } style={{backgroundColor:"#4caf50"}} className="approve-button">Approve</button>
      <button onClick={() =>{
        showLoader();
        statusHandler(loanId,setRequestData,"decline") 
        hideLoader();
      }} style={{backgroundColor:"#f44336"}} className="decline-button">Decline</button>
    </div>
  </div>
  )
}

export default AdminRequest