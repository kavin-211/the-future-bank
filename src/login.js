import React, { useState } from 'react';
import './style.css';
import { useAppContext } from './Appcontext';

// Importing audio files
import notAccNoAudio from './assets/not-accno.mp3';
import notPasswordAudio from './assets/not-password.mp3';
import invalidAccNoAudio from './assets/invalid-accno-password.mp3';

const LoginPage = () => {
  const { setLoggedInUser, users, setCurrentPage } = useAppContext();
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [accountError, setAccountError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let firstErrorAudio = null; // Track first error audio

    // Account Number Validation
    if (accountNumber.trim() === '') {
      setAccountError('Account number is required');
       if (!firstErrorAudio) firstErrorAudio = notAccNoAudio;
    } else {
      setAccountError('');
    }

    // Password Validation
    if (password.trim() === '') {
      setPasswordError('Password is required');
      if (!firstErrorAudio) firstErrorAudio = notPasswordAudio;
    } else {
      setPasswordError('');
    }

    // Play the first encountered error audio and stop execution
    if (firstErrorAudio) {
      playAudio(firstErrorAudio);
      return;
    }

    // Check if user exists
    const user = users.find((u) => u.accountNumber === accountNumber && u.password === password);

    if (user) {
      setLoggedInUser(user);
      setCurrentPage('detail');
      alert('Login successful!');
    } else {
      setAccountError('Invalid account number or password');
      setPasswordError('Invalid account number or password');
      playAudio(invalidAccNoAudio); // Play invalid login audio
    }

    setAccountNumber('');
    setPassword('');
  };

  return (
    <div className="deposit-page">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        
        <p>Account Number:</p>
        <input
          type="text"
          value={accountNumber}
          className="transparent-input"
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        {accountError && <p className="error-message" style={{ color: 'red', fontSize: '20px' }}>{accountError}</p>}
        <br />

        <p>Password:</p>
        <input 
          type="password"
          value={password}
          className="transparent-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error-message" style={{ color: 'red', fontSize: '20px' }}>{passwordError}</p>}
        <br />

        <button type="submit" style={{border:'1px solid black'}}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
