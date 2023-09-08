import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({registerHandler,showLoader,hideLoader,setLoggedIn}) => {
  // State to manage the selected role
  const [selectedRole, setSelectedRole] = useState("user");

  // An array of available roles
  const roles = ["admin"];

  // Event handler to update the selected role
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const navigate = useNavigate();
  return (
    <div className="register-main-container">
      <form onSubmit={(e) => {
        showLoader();
        registerHandler(e,selectedRole,navigate,setLoggedIn)
        hideLoader();
        }} className="register-small-container">
        <h1>Create Account</h1>
        <input type="text" placeholder="Name..." required />
        <input type="email" placeholder="Email..." required />
        <input type="password" placeholder="Create Password..." required />
        <div>
          <label>Select Role:</label>
          <select style={{marginLeft:10}} value={selectedRole} onChange={handleRoleChange}>
            <option value="user">user</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
        <div>
          Already have an Account ?<Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
