import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import {authenticateUser} from '../api/authApi.jsx';

const LoginButton = () => {
  const [userInfo, setUserInfo] = useState(null); // UserInfo管理

  const handleSuccess = async (response) => {
    const token = response.credential; // JWTトークン
    console.log("フロントエンド9取得したJWT:", token); // dbg用、後で消す

    try {
      // バックエンドgogole認証トークン確認送信
      const date = await authenticateUser(token);
      console.log("バックエンドからの応答",date);

      // User情報の設定
      setUserInfo(date);

    } catch (error) {
      console.error("バックエンド送信エラー:", error);
    }
  };

  if (userInfo) {
    // userInfoが存在する場合は、ユーザー情報を表示
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome, {userInfo.userName}!</h1>
        <p>あれ？</p>
        <p>Email: {userInfo.email}</p>
      </div>
    );
  }

  // <GoogleLogin>はGoogleログインボタンを表示し、ユーザーがログインした後にonSuccessイベントで認証情報を取得する
  return (
    <div style={{ textAlign: 'center' }}>
      <p>ログインしてください</p> {/* ここに追加の文字を入れています */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={(error) => console.error("Googleログインエラー:", error)}
      />
      <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
    </div>
  );
};

export default LoginButton;



// 2024-/11/24
// const LoginButton = () => {
//   const [userInfo, setUserInfo] = useState(null); // UserInfo管理

//   const handleSuccess = async (response) => {
//     const token = response.credential; // JWTトークン
//     console.log("(フロントエンド9取得したJWT:", token); // dbg用、後で消す

//     try {
//       // JWTをバックエンドに送信
//       const backendResponse = await fetch("http://localhost:8080/auth/receiveJwt", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token }), // トークンをJSON形式で送信
//       });

//       const result = await backendResponse.text(); // テキストレスポンスを取得
//       console.log("バックエンドのレスポンス:", result);

//       // 必要ならレスポンスからユーザー情報を設定
//       //setUserInfo({ userName: "Sample User", email: "sample@example.com" }); // デモ用
//     } catch (error) {
//       console.error("バックエンド送信エラー:", error);
//     }
//   };

//   if (userInfo) {
//     // userInfoが存在する場合は、ユーザー情報を表示
//     return (
//       <div style={{ textAlign: 'center' }}>
//         <h1>Welcome, {userInfo.userName}!</h1>
//         <p>あれ？</p>
//         <p>Email: {userInfo.email}</p>
//       </div>
//     );
//   }

//   // <GoogleLogin>はGoogleログインボタンを表示し、ユーザーがログインした後にonSuccessイベントで認証情報を取得する
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <p>ログインしてください</p> {/* ここに追加の文字を入れています */}
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onFailure={(error) => console.error("Googleログインエラー:", error)}
//       />
//       <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
//     </div>
//   );
// };

// export default LoginButton;