import React from 'react';
import { useAppContext } from './Appcontext';
// import './style.css';

const DetailPage = () => {
  const { loggedInUser, users } = useAppContext();
  
  const renderUserDetails = () => {
    if (loggedInUser && loggedInUser.isAdmin) {
      return users.slice(2).map((user, index) => (
        <div key={user.accountNumber} className="detail-page">
          <h1>User Details {index + 1}</h1>
          <p>Account Number: {user.accountNumber}</p>
          <p>Name: {user.name}</p>
          <p>Mail Id: {user.mailId}</p>
          <p>Password: *********</p>
          <p>Balance: {user.balance}</p>
          <p>Login Time: {user.loginTime ? user.loginTime.toLocaleString() : 'N/A'}</p>
        </div>
      ));
    } else {
      return (
        <div className="deposit-page">
          <h1>Your Details</h1>
          <p>Account Number: {loggedInUser?.accountNumber}</p>
          <p>Name: {loggedInUser?.name}</p>
          <p>Mail Id: {loggedInUser?.mailId}</p>
          <p>Password: *********</p>
          <p>Balance: {loggedInUser?.balance || 0}</p>
          <p>Login Time: {loggedInUser?.loginTime ? loggedInUser.loginTime.toLocaleString() : 'N/A'}</p>
        </div>
      );
    }
  };

  return <>{renderUserDetails()}</>;
};

export default DetailPage;
