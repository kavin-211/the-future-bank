import React from 'react';
import { useAppContext } from './Appcontext';

const UsersTable = () => {
  const { users } = useAppContext();

  return (
    <div>
      <h2>Users List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Account Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Admin</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.accountNumber}</td>
              <td>{user.name}</td>
              <td>{user.mailId}</td>
              <td>{user.balance}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>{new Date(user.loginTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
