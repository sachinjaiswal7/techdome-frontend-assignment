import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const Declined = ({showLoader,hideLoader}) => {
    const [declinedRequests,setDeclinedRequest] = useState([]);
    useEffect(() => {
        showLoader();
        const declinedData = async() => {
            try{
                const declined = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/declined`,{
                    headers : {
                        Authorization : `Bearer ${Cookies.get("token")}`
                    }
                })

                setDeclinedRequest(declined.data.declined);
            }catch(err){
                console.log(err);
            }
        }

        declinedData();
        hideLoader();
        // eslint-disable-next-line
    },[]);
    
      return (
        <div className="declined-requests">
          <h2>Declined Loans</h2>
          {declinedRequests.map((request, index) => (
            <div className="declined-request" key={index}>
              <div className="request-info">
                <p><b>Loan ID</b>: {request._id}</p>
                <p><b>Status</b>: <span className="declined-status">Declined</span></p>
                <p><b>Date</b>: {request.createdAt.split("T")[0]}</p>
                <p><b>Amount</b>: ${request.amount}</p>
                <p><b>Term</b>: {request.term} months</p>
              </div>
            </div>
          ))}
        </div>
      );
}

export default Declined