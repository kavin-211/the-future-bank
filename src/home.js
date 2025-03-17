import React from 'react';
import './style.css';

import { useAppContext } from './Appcontext';

const HomePage = () => {
  const { setCurrentPage } = useAppContext();

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <div className="action-buttons" >
        <button className="btn1" onClick={() => handleButtonClick('login') }  >
          Login
        </button>
        <button className="btn2" onClick={() => handleButtonClick('createAccount')}>
          Sign Up
        </button>
        
      </div>
      <img src='https://static.vecteezy.com/system/resources/thumbnails/013/948/616/small/bank-icon-logo-design-vector.jpg'  alt="Bank Logo"/>
      <div className='home-content'>
      <h2 className='center'>Welcome to the Future Bank</h2>
     
      
      <p className='center'>Future Bank is a forward-thinking financial institution dedicated to providing a secure and trustworthy platform for individuals and businesses to manage their finances.<br>
      </br> Committed to transparency, integrity, and customer-centric services, Future Bank strives to build lasting relationships with its clients.</p>
      </div>
    </div>

  );
};

export default HomePage;
