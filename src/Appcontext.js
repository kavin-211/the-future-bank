import { createContext, useContext, useState, useEffect, useRef } from 'react';
import './style.css';
import './admin.css';
import './userbox.css';

// Importing admin login success audio and videos
import adminLoginAudio from './assets/admin-kavin.mp3';
import adminLoginVideo from './assets/admin-login.mp4';
import loopVideo from './assets/hitech.mp4';
import userImage from './assets/admin-image2.jpg';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([
    {
      accountNumber: '12',
      name: 'Admin account',
      mailId: 'admin@example.com',
      password: 'ad',
      balance: 0,
      isAdmin: true,
      loginTime: new Date(),
    },
    {
      accountNumber: '2345678',
      name: 'Dummy account',
      mailId: 'user@example.com',
      password: 'user1password',
      balance: 0,
      isAdmin: false,
      loginTime: new Date(),
    },
    {
      accountNumber: '2345670',
      name: 'Kenrich',
      mailId: 'kenrich@gmail.com',
      password: 'kenrich',
      balance: 100,
      isAdmin: true,
      loginTime: new Date(),
    },
    {
      accountNumber: '2345671',
      name: 'Vikash',
      mailId: 'vikash@outlook.com',
      password: 'user1password',
      balance: 2000,
      isAdmin: true,
      loginTime: new Date(),
    },
    {
      accountNumber: '2345672',
      name: 'Pathran',
      mailId: 'pathran@zoho.com',
      password: 'user1password',
      balance: 0,
      isAdmin: false,
      loginTime: new Date(),
    },
  ]);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    if (loggedInUser && loggedInUser.isAdmin) {
      setShowVideo(true);
      setVideoCompleted(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setShowVideo(false);
      setVideoCompleted(false);
    }
  }, [loggedInUser]);

  const handleVideoEnd = () => {
    setShowVideo(false);
    setVideoCompleted(true);
    if (!audioRef.current) {
      audioRef.current = new Audio(adminLoginAudio);
    }
    audioRef.current.play();
  };

  const logout = () => {
    setLoggedInUser(null);
    setCurrentPage('home');
  };

  const contextValue = {
    currentPage,
    setCurrentPage,
    loggedInUser,
    setLoggedInUser,
    users,
    setUsers,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ display: loggedInUser && loggedInUser.isAdmin ? 'none' : 'block' }}>
        {children}
      </div>
      {loggedInUser && loggedInUser.isAdmin && (
        <div>
          {showVideo ? (
            <video ref={videoRef} src={adminLoginVideo} autoPlay onEnded={handleVideoEnd} className="admin-login-video" />
          ) : videoCompleted ? (
            <>
              <video src={loopVideo} autoPlay loop muted className="admin-loop-video" />
              <button onClick={logout} className="admin-logout">Back</button>
              <UsersTable />
            </>
          ) : null}
          
        </div>
      )}
    </AppContext.Provider>
  );
};

const UsersTable = () => {
  const { users } = useAppContext();
  return (
    <div className="users-container">
      <div className="user-box">
        <img src={userImage} alt="User" className="user-image" />
        <p className="user-name">Admin</p>
        
      </div>
      <center>
        <h1 className='center' style={{color:'#00ffff'}}>The Future Bank</h1>
        <h2 style={{marginTop:'50px'}}>Admin DashBoard</h2>
        </center>
      <table className="data-table" border="2" cellPadding="10" cellSpacing="0">
        <thead style={{opacity:'1'}}>
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Current Balance</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(2).map((user, index) => (
            <tr key={index}>
              <td>{user.accountNumber}</td>
              <td>{user.name}</td>
              <td>{user.mailId}</td>
              <td>{user.balance ?? 0}</td>
              <td>{user.loginTime.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};