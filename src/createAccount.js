import React, { useState } from 'react';
import './style.css';
import { useAppContext } from './Appcontext';

// Importing audio files
import notNameAudio from './assets/not-name.mp3';
import nameErrorAudio from './assets/name-error.mp3';
import notMailAudio from './assets/not-mail.mp3';
import mailErrorAudio from './assets/mail-error.mp3';
import existingMailAudio from './assets/existing-mail.mp3'; // New audio for existing mail
import notPasswordAudio from './assets/not-password.mp3';
import passwordErrorAudio from './assets/password-error.mp3';
import createdAudio from './assets/account-created.mp3';

const CreateAccountPage = () => {
  const { setLoggedInUser, setUsers, users, setCurrentPage } = useAppContext();

  const [name, setName] = useState('');
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ name: '', mailId: '', password: '' });

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const generateAccountNumber = () => {
    let accountNumber;
    const existingAccountNumbers = new Set(users.map(user => user.accountNumber));

    do {
      accountNumber = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a unique 6-digit number
    } while (existingAccountNumbers.has(accountNumber));

    return accountNumber;
  };

  const createAccount = () => {
    const accountNumber = generateAccountNumber();
    const nameRegex = /^[A-Za-z ]+$/; // Updated regex to allow spaces between words
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    let isValid = true;
    let errors = { name: '', mailId: '', password: '' };
    let firstErrorAudio = null; // Store first error audio

    // Name Validation
    if (!name) {
      errors.name = 'Please enter your name.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = notNameAudio;
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name can only contain letters and spaces.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = nameErrorAudio;
    }

    // Mail Validation
    if (!mailId) {
      errors.mailId = 'Please enter your email address.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = notMailAudio;
    } else if (!emailRegex.test(mailId)) {
      errors.mailId = 'Please enter a valid email address.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = mailErrorAudio;
    } else if (users.some(user => user.mailId === mailId)) {
      errors.mailId = 'Email already exists. Please use a different email.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = existingMailAudio; // Play "existing mail" audio
    }

    // Password Validation
    if (!password) {
      errors.password = 'Please enter a password.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = notPasswordAudio;
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter, a maximum of 8 characters, and at least one special character.';
      isValid = false;
      if (!firstErrorAudio) firstErrorAudio = passwordErrorAudio;
    }

    setErrorMessage(errors);

    if (!isValid) {
      // Play only the first encountered error's audio
      if (firstErrorAudio) playAudio(firstErrorAudio);
      return;
    }

    // Account creation success
    const newAccountDetails = {
      accountNumber,
      name,
      mailId,
      password,
      isAdmin: false,
      loginTime: new Date(),
    };
    setUsers((prevUsers) => [...prevUsers, newAccountDetails]);
    setLoggedInUser(newAccountDetails);

    setName('');
    setMailId('');
    setPassword('');
    setErrorMessage({ name: '', mailId: '', password: '' });
    setCurrentPage('deposit');

    // Play success audio before showing the alert
    playAudio(createdAudio);

    setTimeout(() => {
      alert(`Your Account has been Created Successfully! Your account number is ${accountNumber}`);
    }, 500); // Delay alert slightly to ensure audio starts playing
  };

  return (
    <div className="create-account-page">
      <h2>Create Account</h2>

      <label>Name:</label>
      <input
        type="text"
        value={name}
        className="transparent-input"
        onChange={(e) => setName(e.target.value)}
      />
      {errorMessage.name && <div className="error-message">{errorMessage.name}</div>}
      <br />

      <label>Mail Id:</label>
      <input
        type="text"
        value={mailId}
        className="transparent-input"
        onChange={(e) => setMailId(e.target.value)}
      />
      {errorMessage.mailId && <div className="error-message">{errorMessage.mailId}</div>}
      <br />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        className="transparent-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage.password && <div className="error-message">{errorMessage.password}</div>}
      <br />

      <button onClick={createAccount}>Create Account</button>
    </div>
  );
};

export default CreateAccountPage;
