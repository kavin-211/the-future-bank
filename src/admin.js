import React, { useState } from 'react';
import './admin.css'; 
import { useAppContext } from './Appcontext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AdminLoginPage = () => {
  const { setLoggedInUser, setCurrentPage } = useAppContext();
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUsernameError, setAdminUsernameError] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAdminLogin = (e) => {
    e.preventDefault();

    let valid = true;
    if (adminUsername.trim() === '') {
      setAdminUsernameError('Admin username is required');
      valid = false;
    } else {
      setAdminUsernameError('');
    }

    if (adminPassword.trim() === '') {
      setAdminPasswordError('Password is required');
      valid = false;
    } else {
      setAdminPasswordError('');
    }

    if (!valid) return; // Stop if validation fails

    // Check if admin username and password match specific values
    if (adminUsername === 'Kavin' && adminPassword === '950024') {
      const adminUser = { username: 'Kavin', role: 'admin' };
      setLoggedInUser(adminUser); // Set logged in user in the context
      setCurrentPage('admin-dashboard'); // Set current page context (optional)
      alert('Admin login successful!');
      navigate('/admin-dashboard'); // Redirect to the admin-dashboard page
    } else {
      setAdminUsernameError('Invalid admin username or password');
      setAdminPasswordError('Invalid admin username or password');
    }

    // Only clear the fields if login fails, otherwise keep the input for re-entry
    if (adminUsername !== 'Kavin' || adminPassword !== '950024') {
      setAdminUsername('');
      setAdminPassword('');
    }
  };

  // Handling input changes
  const handleUsernameChange = (e) => {
    setAdminUsername(e.target.value);
    if (adminUsernameError) {
      setAdminUsernameError(''); // Clear error once user starts typing
    }
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
    if (adminPasswordError) {
      setAdminPasswordError(''); // Clear error once user starts typing
    }
  };

  return (
    <div className="admin-login-page">
      <form onSubmit={handleAdminLogin}>
        <h1>Admin Login</h1>
        
        <p>Admin Username:</p>
        <input
          type="text"
          value={adminUsername}
          className="transparent-input"
          onChange={handleUsernameChange}
        />
        {adminUsernameError && <p className="error-message">{adminUsernameError}</p>}
        
        <br />
        
        <p>Password:</p>
        <input
          type="password"
          value={adminPassword}
          className="transparent-input"
          onChange={handlePasswordChange}
        />
        {adminPasswordError && <p className="error-message">{adminPasswordError}</p>}
        
        <br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
