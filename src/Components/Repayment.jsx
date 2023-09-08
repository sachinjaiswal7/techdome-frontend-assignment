import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
const handlePayClick = async(loanId,repaymentTerm,setLoanTerms) => {
        try{
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/loan/repayment`,{
                loanId,
                repaymentTerm
            },{
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            })
            toast.success("Repayment done, There are no checks on the date of the repayment as it was written in the assignment document")
            const term = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/repayment/${loanId}`,{
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            })
            setLoanTerms(term.data.repayments)
            
        }catch(err){
            if(err.response){
                toast.error(err.response.data.message);
            }
            else{
                toast.error("Internal Server error");
            }
        }
};


const Repayment = ({showLoader,hideLoader}) => {
    const {loanId} = useParams();
    const [loanTerms,setLoanTerms] = useState([]);

    useEffect(() => {
        const termData = async() => {
            showLoader();
            try{
            const term = await axios.get(`${process.env.REACT_APP_SERVER_URL}/loan/repayment/${loanId}`,{
                headers : {
                    Authorization : `Bearer ${Cookies.get("token")}`
                }
            })
            setLoanTerms(term.data.repayments)
        }catch(err){
            console.log(err);
        }
        hideLoader();
        }
        termData();

        // eslint-disable-next-line 
    },[]);
    
    
    
      return (
        <div className="repayment-page">
          <h2>Loan Repayment for loanID : {loanId}</h2>
          <div className="loan-terms">
            {loanTerms.map((term, index) => (
                
              <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between",alignItems:"center"}} className="term" key={index}>
                <div>
                <p><b>Serial Number</b>: {index + 1}</p>
                <p><b>Due-Date</b>: {term.dueDate.split("T")[0]}</p>
                <p><b>Amount:</b> ${term.repaymentAmount}</p>
                <p><b>Status</b>: {term.status}</p>
                </div>
                {term.status === 'PAY' && (
                  <button onClick={async() => {
                    showLoader();
                    await handlePayClick(loanId,index+1,setLoanTerms)
                    hideLoader();
                }
                }>Pay</button>
                )}
                </div>
            
            ))}
          </div>
        </div>
      );
}

export default Repayment