import { GoogleLogin } from '@react-oauth/google';
import { useState,useCallback } from 'react';
import { authenticateUser } from '../api/authApi.jsx';
import '../css/spinner.css'; // スピナーのCSSをインポート
import { auth } from './firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // FirebaseErrorをインポート



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

  /* Furebase Refacting */
  // GoogleAuthProviderのインスタンスを作成
  const provider = new GoogleAuthProvider();
  
  const signInWithGoogle = useCallback(async () => {
    try {

      /*signInWithPopup(auth: Auth, provider: AuthProvider, resolver?: PopupRedirectResolver): Promise<UserCredential>
        auth:Auth ...FirebaseAuthインスタンス
        provider:AuthProvider Ouah系Provider
      */
      const result = await signInWithPopup(auth, provider)

      // ログイン成功時のユーザー情報
      const user = result.user;
      // console.log("Logged in user:", user);
      const idToken = await user.getIdToken();
      console.log("idToken ="+idToken);

      // 以下はGoogle Oauthアクセストークン(googleドライブやGoogleカレンダーへのアクセスを許可する)
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      return { success: true, message: '' }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
      return { success: false, message: 'エラーが発生しました' }
    }
  }, [provider])


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
      {/* <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={(error) => console.error("Googleログインエラー:", error)}
      /> */}
      <button onClick={signInWithGoogle}>ここにGoogole認証ボタンを設置!!!</button>
      <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
    </div>
  );
};

export default LoginButton;
