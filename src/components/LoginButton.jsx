import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { authenticateUser } from '../api/authApi.jsx';
import '../css/spinner.css'; // スピナーのCSSをインポート

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
