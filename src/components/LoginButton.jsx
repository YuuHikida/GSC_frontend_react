import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const LoginButton = () => {
  const [userInfo, setUserInfo] = useState(null); // UserInfo管理

  const handleSuccess = async (response) => {
    const token = response.credential; // JWTトークン
    console.log("取得したJWT:", token); // dbg用、後で消す

    try {
      // JWTをバックエンドに送信
      const backendResponse = await fetch("http://localhost:8080/receiveJwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // トークンをJSON形式で送信
      });

      const result = await backendResponse.text(); // テキストレスポンスを取得
      console.log("バックエンドのレスポンス:", result);

      // 必要ならレスポンスからユーザー情報を設定
      setUserInfo({ userName: "Sample User", email: "sample@example.com" }); // デモ用
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













// import { GoogleLogin } from '@react-oauth/google';
// import {authenticateUser} from '../api/authApi';
// import { useState } from 'react';

// const LoginButton = () => {
//     const[userInfo,setUserInfo] = useState(null); //UserInfo管理

//     const handleSuccess = async(response) => {
//     const token = response.credential;// JWTトークン
//     console.log("取得したJWT:", token); //dbg用、後で消す
//     //console.log("クライアントID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);


//     try{
//         const data = await authenticateUser(token);
//         console.log("バックエンドからの応答",data);
//         setUserInfo(data);
//     }catch(error)
//     {
//         console.error("エラー:",error);
//     }
//   };

//   if (userInfo) 
//     {
//         // userInfoが存在する場合は、ユーザー情報を表示
//         return (
//         <div style={{ textAlign: 'center' }}>
//             <h1>Welcome, {userInfo.userName}!</h1>
//             <p>Email: {userInfo.email}</p>
//         </div>
//         );
//     }


// // <GoogleLogin>はGoogleログインボタンを表示し、ユーザーがログインした後にonsuccsイベントで認証情報を取得する
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <p>ログインしてください</p> {/* ここに追加の文字を入れています */}
//       <GoogleLogin
//         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // 明示的にクライアントIDを指定
//         onSuccess={handleSuccess}
//         onFailure={(error) => console.error("Googleログインエラー:", error)}
//       />
//       <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
//     </div>
//   );
// };

// export default LoginButton;
