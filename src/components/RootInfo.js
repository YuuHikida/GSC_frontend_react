import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/usefetch';
import { fetchRootData } from '../api/rootApi';

  
const Home = () => {
  return (
    <div>
      <h1>ここにGCSの説明</h1>
      <a href="/oauth2/authorization/google">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Login with Google
        </button>
      </a>
    </div>
  );
};

export default Home;




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
