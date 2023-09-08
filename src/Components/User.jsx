import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Request from './Request'
import Approved from './Approved'
import Declined from './Declined'
import Paid from './Paid'
import { useNavigate } from 'react-router-dom'
import  { useEffect } from 'react'
import Cookies from 'js-cookie'
import Repayment from './Repayment'

const User = ({showLoader,hideLoader}) => {
    const navigate = useNavigate();
    useEffect(()=>{
      if(!Cookies.get("token")){
        navigate("/");
      }
      // eslint-disable-next-line
    },[])
  return (
    <>
    <nav className="navbar">
    <div className="navbar-left">
      <h1>Loan Web App</h1>
    </div>
    <div className="navbar-right">
      <Link to="request">Request</Link>
      <Link to="approved">Approved</Link>
      <Link to="declined">Declined</Link>
      <Link to="paid">Paid</Link>
    </div>

  </nav>
    <Routes>
        <Route path='/request' element={<Request showLoader={showLoader} hideLoader={hideLoader}/>}/>
        <Route path='/approved/*' element = {<Approved showLoader={showLoader} hideLoader={hideLoader}/>}/>
        <Route path='/declined' element = {<Declined showLoader={showLoader} hideLoader={hideLoader}/>}/>
        <Route path='/paid' element = {<Paid showLoader={showLoader} hideLoader={hideLoader}/>}/>
        <Route path='/repayment/:loanId' element={<Repayment showLoader={showLoader} hideLoader={hideLoader}/>}/>
        
    </Routes>
    </>
  )
}

export default User