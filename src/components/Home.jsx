import React, { useEffect, useState } from 'react';
import {getUserHomeInfo} from '../api/homeApi';


const Home =() =>{
    const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/auth/testAuthenticate`);
      if (data) {
        setUserInfo(data);
      }
    };

    fetchData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Welcome, {userInfo.userName}!</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default Home;