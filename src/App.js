import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080')  // Goバックエンドのエンドポイント
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>GitHub User Info</h1>
      {data ? (
        <div>
          <p>ID: {data._id}</p>
          <p>Git Name: {data.git_name}</p>
          <p>Email: {data.mail}</p>
          <p>Time: {data.time}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
