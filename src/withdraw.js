import React, { useState } from 'react';
import './style.css';
import { useAppContext } from './Appcontext';
import withdrawSound from './assets/withdrawn.mp3'; // Import the withdrawal audio file
import insufficientSound from './assets/thanks.mp3'; // Import the insufficient funds audio file
import limitSound from './assets/thanks.mp3'; // Import the withdrawal limit exceeded audio file

const WithdrawPage = () => {
  const { loggedInUser, setLoggedInUser, setUsers } = useAppContext();
  const [amount, setAmount] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount);

    if (withdrawAmount > 10000) {
      setPopupMessage('Withdrawal limit exceeded! Maximum Rs. 10,000 per transaction.');
      
      // Play limit exceeded sound
      const audio = new Audio(limitSound);
      audio.play();
      
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return;
    }

    if (withdrawAmount <= loggedInUser?.balance) {
      const newBalance = loggedInUser.balance - withdrawAmount;

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

      setPopupMessage(`Rs.${withdrawAmount} withdrawn successfully!`);
      
      // Play withdrawal sound
      const audio = new Audio(withdrawSound);
      audio.play();
    } else {
      setPopupMessage('Insufficient funds!');
      
      // Play insufficient funds sound
      const audio = new Audio(insufficientSound);
      audio.play();
    }

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    setAmount('');
    setIsButtonDisabled(true);
  };

  const handleAmountChange = (e) => {
    const newValue = e.target.value;
    setAmount(newValue);

    if (newValue === '' || parseInt(newValue) <= 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const buttonStyle = {
    backgroundColor: isButtonDisabled ? 'lightgray' : 'black',
    color: 'white',
    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
  };

  return (
    <div className="deposit-page">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg"
        alt="login form"
        className="img-fluid"
      />
      <br />
      <h1>ATM Withdraw</h1>
      <br />
      <p>Account Number: {loggedInUser?.accountNumber}</p>
      <br />
      <h3 id="balance">Account Balance Rs.{loggedInUser?.balance}</h3>
      <br />
      <label>Enter the Amount</label>
      <input
        type="number"
        placeholder="Enter the Amount"
        value={amount}
        className="transparent-input"
        onChange={handleAmountChange}
      />
      <br />
      <button onClick={handleWithdraw} style={buttonStyle} disabled={isButtonDisabled}>
        Withdraw
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

export default WithdrawPage;