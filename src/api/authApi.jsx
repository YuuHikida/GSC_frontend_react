// // src/api/authApi.jsx
// export const authenticateUser = async (token) => { //async　関数の非同期関数宣言
//     try {
//       //const response = await fetch(`${process.env.REACT_APP_API_URL}`, { 
//       //const response = await fetch("http://localhost:8080/auth/receiveJwt", { 
//       // 環境変数(REACT_APP はプレフィックスが必要。それ以外はReactアプリで読み込まない)
//       await fetch(`${process.env.REACT_APP_API_URL}/auth/testAuthenticate`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           // トークンをヘッダに含める場合
//           'Authorization': `Bearer ${token}` 
//         },
//         // ボディにトークンを JSON として送る例
//         body: JSON.stringify({ token }), 
//       });
      
    
//       if (!response.ok) {
//         throw new Error(`HTTPエラー: ${response.status}`);
//       }
    
//       return await response.json(); //サーバーからの応答をJSON形式で解析。非同期処理
    
//     } catch (error) {
//       console.error("APIエラー:", error);
//       throw error; // コンポーネントでエラー処理を行えるように投げる
//     }
//   };
  

//   /**
//    * 
//    */