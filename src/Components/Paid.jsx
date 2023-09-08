import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Paid = ({showLoader,hideLoader}) => {
  const [paidRequests, setPaidRequests] = useState([]);

  useEffect(() => {
    showLoader();
    const paidData = async () => {
      try {
        const paid = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/loan/paid`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPaidRequests(paid.data.paid);
      } catch (err) {
        console.log(err);
      }
    };
    paidData();
    hideLoader();

    // eslint-disable-next-line 
  }, []);

  return (
    <div className="paid-requests">
      <h2>Paid Loans</h2>
      {paidRequests.map((request, index) => (
        <div className="paid-request" key={index}>
          <div className="request-info">
            <p><b>Loan ID</b>: {request._id}</p>
            <p>
              <b>Status</b>: <span className="paid-status">Paid</span>
            </p>
            <p><b>Date</b>: {request.createdAt.split("T")[0]}</p>
            <p><b>Amount</b>: ${request.amount}</p>
            <p><b>Term</b>: {request.term} weeks</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paid;
