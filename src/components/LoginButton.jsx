import { GoogleLogin } from '@react-oauth/google';
import {authenticateUser} from './api/authApi';

const LoginButton = () => {
    const[userInfo,setUserInfo] = useState(null); //UserInfo管理

    const handleSuccess = async(response) => {
    const token = response.credential;
    console.log("IDトークン:", token); //dbg用、後で消す

    try{
        const data = await authenticateUser(token);
        console.log("バックエンドからの応答",data);
        setUserInfo(data);
    }catch(error)
    {
        console.error("エラー:",error);
    }
  };

  if (userInfo) 
    {
        // userInfoが存在する場合は、ユーザー情報を表示
        return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome, {userInfo.userName}!</h1>
            <p>Email: {userInfo.email}</p>
        </div>
        );
    }


// <GoogleLogin>はGoogleログインボタンを表示し、ユーザーがログインした後にonsuccsイベントで認証情報を取得する
  return (
    <div style={{ textAlign: 'center' }}>
      <p>ログインしてください</p> {/* ここに追加の文字を入れています */}
      <GoogleLogin onSuccess={handleSuccess} />
      <p>このサイトを利用するにはGoogleアカウントでのログインが必要です。</p>
    </div>
  );
};

export default LoginButton;