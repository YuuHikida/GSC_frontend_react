import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useFetch } from './hooks/usefetch';
import { AllGetUserData ,RegisterData } from './api/userApi';
import  Root  from './components/RootInfo';
import UserInfo from './components/UserInfo';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';



// UserPageコンポーネント ("/user" ルートに表示)
function UserPage() {
  const { data: userData, loading: userLoading, error: userError } = useFetch(AllGetUserData);

  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>ユーザー情報</h1>
      <UserInfo data={userData} />
      {/* ホームページへのリンク */}
      <Link to="/">ホームに戻る</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/loginSuccess" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

 export default App;


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* "/" ルートにはHomeコンポーネントを表示 */}
//         <Route path="/" element={<Home />} />
//         {/* "/user" ルートにはUserPageコンポーネントを表示 */}
//         
//       </Routes>
//     </Router>
//   );
// }
