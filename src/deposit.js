import React, { useState } from 'react';
import './style.css';
import { useAppContext } from './Appcontext';
import depositSound from './assets/deposited.mp3'; // Import the deposit audio file
import limitSound from './assets/limit.mp3'; // Import the deposit limit exceeded audio file

const DepositPage = () => {
  const { loggedInUser, setLoggedInUser, setUsers } = useAppContext();
  const [amount, setAmount] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleDeposit = () => {
    const depositAmount = parseInt(amount);

    if (depositAmount > 10000) {
      setPopupMessage('Deposit limit exceeded! Maximum Rs. 10,000 per transaction.');
      
      // Play limit exceeded sound
      const audio = new Audio(limitSound);
      audio.play();
      
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return;
    }

    if (isNaN(depositAmount) || depositAmount <= 0) return;

    const newBalance = (loggedInUser?.balance || 0) + depositAmount;

    setLoggedInUser({
      ...loggedInUser,
      balance: newBalance,
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.accountNumber === loggedInUser.accountNumber
          ? { ...user, balance: newBalance }
          : user
      )
    );

    setAmount('');
    setPopupMessage(`Rs.${depositAmount} deposited successfully!`);
    setShowPopup(true);

    // Play deposit sound
    const audio = new Audio(depositSound);
    audio.play();

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const buttonStyle = {
    backgroundColor: parseInt(amount) <= 0 || isNaN(parseInt(amount)) ? 'lightgray' : 'black',
    color: 'white',
    cursor: parseInt(amount) <= 0 || isNaN(parseInt(amount)) ? 'not-allowed' : 'pointer',
  };

  return (
    <div className="deposit-page">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg"
        alt="login form"
        className="img-fluid"
      />
      <br />
      <h1>ATM Deposit</h1>
      <br />
      <p>Account Number: {loggedInUser?.accountNumber}</p>
      <br />
      <h3 id="balance">Account Balance Rs. {loggedInUser?.balance || 0}</h3>
      <br />
      <label>Enter the Amount</label>
      <input
        type="number"
        placeholder="Enter the Amount"
        value={amount}
        className="transparent-input"
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button
        onClick={handleDeposit}
        disabled={parseInt(amount) <= 0 || isNaN(parseInt(amount))}
        style={buttonStyle}
      >
        Deposit
      </button>
      <p className="center">Please remember your account number for next login</p>

      {showPopup && (
        <div className="popup-box">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DepositPage;