import React,{ useState,useEffect} from 'react';

function App(){
  // API取得データ
  const[data, setData] = useState(null);

  // call API that roading page
  useEffect(()=>{
    // ページがロードされた時にAPIを呼び出す

    fetch('http://localhost:8080/')  // GoのAPIエンドポイント
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);  // 空の配列を渡すことで、初回のみ実行される

    // データがまだ取得されていない場合はローディング状態を表示
    if (!data) {
      return <div>Loading...</div>;
    }

      // 取得したデータを表示
    return (
      <div>
        <h1>ユーザー情報</h1>
        <p><strong>ID:</strong> {data._id}</p>
        <p><strong>名前:</strong> {data.git_name}</p>
        <p><strong>メール:</strong> {data.mail}</p>
        <p><strong>時間:</strong> {data.time}</p>
      </div>
    );
}

export default App;