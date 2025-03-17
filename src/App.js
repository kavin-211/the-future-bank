import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use HashRouter for navigation
import { AppProvider, useAppContext } from './Appcontext';
import HomePage from './home';
import CreateAccountPage from './createAccount';
import DepositPage from './deposit';
import WithdrawPage from './withdraw';
import Detailpage from './detail';
import LoginPage from './login';
import AdminPage from './admin';
import AdminLoginPage from './admin';
import Dashboard from './AdminDashboard';
import './style.css';

import logoutAudio from './assets/logout.mp3'; // Import logout audio
import thanksAudio from './assets/thanks.mp3'; // Import thanks audio
import detailsAudio from './assets/details.mp3'; // Import details audio/
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/autobot-spin.gif'; // Import logo image

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div>
          <Navigation />
          <PageRenderer />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

// Navigation Component
const Navigation = () => {
  const { setCurrentPage, loggedInUser, setLoggedInUser, currentPage } = useAppContext();

  const handleLogout = () => {
    const audio = new Audio(logoutAudio);
    audio.play();

    setTimeout(() => {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        const thanks = new Audio(thanksAudio);
        thanks.play();
        setLoggedInUser(null);
        setCurrentPage('home');
      }
    }, 500);
  };

  const handleButtonClick = (page) => {
    if (page === 'detail') {
      const audio = new Audio(detailsAudio);
      audio.play();
    }
    setCurrentPage(page);
  };

  const renderAuthButtons = () => {
    if (loggedInUser) {
      if (loggedInUser.isAdmin) {
        return (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        );
      } else {
        return (
          <>
            <button className="b" onClick={() => handleButtonClick('deposit')}>
              Deposit
            </button>
            <button className="b" onClick={() => handleButtonClick('withdraw')}>
              Withdraw
            </button>
            <button className="b" onClick={() => handleButtonClick('detail')}>
              Details
            </button>
            <button className="b" onClick={handleLogout}>
              Logout
            </button>
          </>
        );
      }
    } else {
      return (
        <>
          {currentPage !== 'home' && (
            <button className="b" onClick={() => handleButtonClick('home')}>
              Home
            </button>
          )}
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '10px' }} />
          <div style={{maxWidth:'130px'}}><h2 className="navbar-brand" style={{ color: '#fff' }}>
            Future Bank... 
          </h2></div>
        </div>
        {renderAuthButtons()}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className='footer'>
      <p>© Kavin. All rights reserved.</p>
    </footer>
  );
};

// PageRenderer Component for Dynamic Page Rendering
const PageRenderer = () => {
  const { currentPage } = useAppContext();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'createAccount':
      return <CreateAccountPage />;
    case 'deposit':
      return <DepositPage />;
    case 'withdraw':
      return <WithdrawPage />;
    case 'detail':
      return <Detailpage />;
    case 'login':
      return <LoginPage />;
    default:
      return <HomePage />;
  }
};

export default App;