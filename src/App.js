import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useFetch } from './hooks/usefetch';
import { AllGetUserData} from './api/userApi';
import  Root  from './components/RootInfo';
import UserInfo from './components/UserInfo';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import LoginButton from './components/LoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';



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
    /* 
    ここでGoogleOAuthProviderを使い、クライアントIDを設定
    囲んだルート全てにClientId
    */
      <Router>
        <div className="App">
          {/* 必要であれば、どのページでも<LoginButton />を使用可能 */}
          <Routes>
            <Route path="/" element={<LoginButton />} />
            <Route path="/loginSuccess" element={<Home />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
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
