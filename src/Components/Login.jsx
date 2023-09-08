import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({loginHandler,showLoader,hideLoader,setLoggedIn}) => {
  const navigate = useNavigate();
  return (
    <div className='login-main-container'>
    <form onSubmit={(e) => {
      showLoader();
      loginHandler(e,navigate,setLoggedIn)
      hideLoader();
      }}  className='login-small-container'>
       <h1>Login to Your account</h1>
       <div className='input-container'>
       <input type="email" placeholder='Gmail...' required />
       <input type="password" placeholder='Password...' required />
       </div>
       <button type='submit'>Login</button>
       <div>Don't have an account ?<Link to="/">register</Link></div>
    </form>
</div>
  )
}

export default Login