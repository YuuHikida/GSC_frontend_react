import React, { useEffect, useState } from 'react';
import {getUserHomeInfo} from '../api/homeApi';


const Home =() =>{
    const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserHomeInfo();
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