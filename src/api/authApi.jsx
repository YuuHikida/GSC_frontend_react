// src/api/authApi.jsx
export const authenticateUser = async (token) => { //async　関数の非同期関数宣言
    try {
      const response = await fetch('http://your-backend-url/api/auth', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      return await response.json(); //サーバーからの応答をJSON形式で解析。非同期処理
    } catch (error) {
      console.error("APIエラー:", error);
      throw error; // コンポーネントでエラー処理を行えるように投げる
    }
  };
  