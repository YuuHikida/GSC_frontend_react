import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { authenticateUser } from '../api/authApi.jsx';
import '../css/spinner.css'; // スピナーのCSSをインポート
import { auth } from './firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginButton = () => {
  const [userInfo, setUserInfo] = useState(null); // ユーザー情報管理
  const [isLoading, setIsLoading] = useState(false); // ローディング状態管理

  const handleSuccess = async (response) => {
    const token = response.credential; // JWTトークン
    console.log("(フロントエンド)取得したJWT:", token);

    setIsLoading(true); // ローディング開始

    try {
      const data = await authenticateUser(token); // バックエンドと通信
      console.log("バックエンドからの応答", data);

      setUserInfo(data); // ユーザー情報の設定
    } catch (error) {
      console.error("バックエンド送信エラー:", error);
    } finally {
      setIsLoading(false); // ローディング終了
    }
  };
  // Furebase Refacting
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); // ここでproviderを宣言

  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>データを取得中です...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  if (userInfo) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome, {userInfo.userName}!</h1>
        <p>Email: {userInfo.email}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p>ログインしてください</p>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={(error) => console.error("Googleログインエラー:", error)}
      />
      <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
    </div>
  );
};

export default LoginButton;
