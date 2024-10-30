import React from 'react';

  
const Root = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div>
      <h1>ここにGCSの説明</h1>
      <button 
        onClick={handleGoogleLogin}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Root;






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
