import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginButton = () => {
  const handleSuccess = async (response) => {
    const token = response.credential; // IDトークンを取得
    // バックエンドにPOSTリクエストでIDトークンを送信
    await fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
};

export default LoginButton;







  // const RootInfo = ({ data }) => (
  //   <div>
  //     <h1>ユーザー情報</h1>
  //     <p><strong>ID:</strong> {data._id}</p>
  //     <p><strong>名前:</strong> {data.git_name}</p>
  //     <p><strong>メール:</strong> {data.mail}</p>
  //     <p><strong>時間:</strong> {data.time}</p>
  //   </div>
  // );
  
  // const Home = () => {
  //   const { data: rootData, loading: rootLoading, error: rootError } = useFetch(fetchRootData);
  
  //   if (rootLoading) return <div>Loading...</div>;
  //   if (rootError) return <div>Error loading data</div>;
  
  //   return (
  //     <div>
  //       <h1>ホーム画面</h1>
  //       <RootInfo data={rootData} />  {/* RootInfoコンポーネントを使用 */}
  //       <Link to="/user">ユーザー情報を見る</Link>
  //     </div>
  //   );
  // };
  
  // export { Home, RootInfo };
