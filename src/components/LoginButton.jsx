import { useState,useCallback } from 'react';
import { authenticateUser } from '../api/authApi.jsx';
import '../css/spinner.css'; // スピナーのCSSをインポート
import { auth } from './firebase.js';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // FirebaseErrorをインポート



// const LoginButton = () => {
//   const [userInfo, setUserInfo] = useState(null); // ユーザー情報管理
//   const [isLoading, setIsLoading] = useState(false); // ローディング状態管理

//   const handleSuccess = async (response) => {
//     const token = response.credential; // JWTトークン
//     console.log("(フロントエンド)取得したJWT:", token);

//     setIsLoading(true); // ローディング開始

//     try {
//       const data = await authenticateUser(token); // バックエンドと通信
//       console.log("バックエンドからの応答", data);

//       setUserInfo(data); // ユーザー情報の設定
//     } catch (error) {
//       console.error("バックエンド送信エラー:", error);
//     } finally {
//       setIsLoading(false); // ローディング終了
//     }
//   };


  /* Furebase Refacting */
  
  function LoginButtonGoogle() {
    const [ansMes, setAnsMes] = useState(null); // useStateはコンポーネント内トップレベルで宣言
    // GoogleAuthProviderのインスタンスを作成
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = useCallback(async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const idToken = await user.getIdToken();
        console.log("idToken =", idToken);

        try {
          const date = await authenticateUser(idToken);
          setAnsMes(date);
        } catch (error) {
          console.log("バックエンド送信エラー", error);
        } finally {
          // 必要であれば後処理
        }

      } catch (e) {
        if (e instanceof FirebaseError) {
          console.log(e)
        }
        return { success: false, message: 'エラーが発生しました' }
      }
    }, [provider])

    //fetch test用
    const testFetch= useCallback(async()=>{
      fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body:JSON.stringify({
          title:'foo',
          body:'bar',
          userId:1,
        }),
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res)=>{
        console.log(res);
        return res.json();
      })
      .then((data)=>{
        console.log(data);
        setAnsMes(data);
      });
    },[]);

    //TestGet
    async function getData(){
      const url = `${process.env.REACT_APP_API_URL}/auth/testAuthenticate`;
      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error('レスポンスステータス:${response.status}');
        }
      } catch (error) {
        console.error("APIエラー:", error);
        throw error; // コンポーネントでエラー処理を行えるように投げる
      }
    }

    if(ansMes)
    {
      return (
        <>
          <p>正常にバックエンドに送信完了</p>
        </>
      )
    }


    return (
      <div style={{ textAlign: 'center' }}>
        <p>ログインしてください</p>
        {/* <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={(error) => console.error("Googleログインエラー:", error)}
        /> */}
        <button onClick={signInWithGoogle}>ここにGoogole認証ボタンを設置!!!</button>
        <button onClick={testFetch}>fetchtest用</button>
        {/* <button onClick={getData}>getData用</button> */}
        <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
      </div>
    );
};

export default LoginButtonGoogle;
