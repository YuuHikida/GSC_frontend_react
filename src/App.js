import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useFetch } from './hooks/usefetch';
import { fetchRootData } from './api/rootApi';
import { fetchUserData } from './api/userApi';
import RootInfo from './components/RootInfo';
import UserInfo from './components/UserInfo';

/*
useFetchの流れ
useFetchに第一級オブジェクト（関数)を渡す
これによりuseFetchで関数を呼び出せる
*/

// Homeコンポーネント ("/" ルートに表示)
function Home() {
  const { data: rootData, loading: rootLoading, error: rootError } = useFetch(fetchRootData);

  if (rootLoading) return <div>Loading...</div>;
  if (rootError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>ホーム画面</h1>
      <RootInfo data={rootData} />
      {/* ユーザー情報ページへのリンク */}
      <Link to="/user">ユーザー情報を見る</Link>
    </div>
  );
}

// UserPageコンポーネント ("/user" ルートに表示)
function UserPage() {
  const { data: userData, loading: userLoading, error: userError } = useFetch(fetchUserData);

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
        {/* "/" ルートにはHomeコンポーネントを表示 */}
        <Route path="/" element={<Home />} />
        {/* "/user" ルートにはUserPageコンポーネントを表示 */}
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;


//以下bk

// import React,{ useState,useEffect} from 'react';

// function App(){
//   // API取得データ
//   const[data, setData] = useState(null);

//   // call API that roading page.
//   useEffect(()=>{
//     // ページがロードされた時にAPIを呼び出す

//     fetch('http://localhost:8080/')  // GoのAPIエンドポイント
//       .then((response) => response.json())// responseはResponseオブジェクト
//       .then((jsonData) => setData(jsonData))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);  // 空の配列を渡すことで、初回のみ実行される

//     // データがまだ取得されていない場合はローディング状態を表示 a
//     if (!data) {
//       return <div>Loading...</div>;
//     }

//       // 取得したデータを表示
//     return (
//       <div>
//         <h1>ユーザー情報</h1>
//         <p><strong>ID:</strong> {data._id}</p>
//         <p><strong>名前:</strong> {data.git_name}</p>
//         <p><strong>メール:</strong> {data.mail}</p>
//         <p><strong>時間:</strong> {data.time}</p>
//       </div>
//     );
// }

// export default App;