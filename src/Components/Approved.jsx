import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Approved = ({showLoader,hideLoader}) => {
    const [approvedRequests,setApprovedRequests] = useState([]);
    useEffect(() => {
        showLoader();
        const approvedData = async() => {
            try{
            const approved = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/approved`,{
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            })
            setApprovedRequests(approved.data.approved);
        }catch(err){
            console.log(err);
        }
        }

        approvedData();
        hideLoader();

        // eslint-disable-next-line
    },[]);
    
    
      return (
        <div className="approved-requests">
          <h2>Approved Loans</h2>
          {approvedRequests.map((request, index) => (
            <div className="approved-request" key={index}>
              <div className="request-info">
                <p><b>Loan ID</b>: {request._id}</p>
                <p><b>Amount</b>: ${request.amount}</p>
                <p><b>Term</b>: {request.term} weeks</p>
                <p><b>Date</b>: {request.createdAt.split("T")[0]}</p>
              </div>
              <div className="request-actions">
                <Link style={{textDecoration:"none",backgroundColor:"#2ecc71", padding:"5px", borderRadius:"5px", color:"black"}} to={`/user/repayment/${request._id}`}>Pay</Link>
              </div>
            </div>
          ))}
         
        </div>
      );
}

export default Approved