import React,{ useState,useEffect} from 'react';

function App(){
  // API取得データ
  const[data, setData] = useState(null);

  // call API that roading page
  useEffect(()=>{
    // ページがロードされた時にAPIを呼び出す

    fetch('http://localhost:8080')  // GoのAPIエンドポイント
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);  // 空の配列を渡すことで、初回のみ実行される


}