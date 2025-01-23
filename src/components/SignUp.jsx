import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function SingUp(){
    const[message,setMessage] = useState('');

    const googleSignUp =useGoogleLogin({
        onSuccess:async(tokenResponse)=>{
            console.log(tokenResponse);

            const accessToken = tokenResponse.access_token;
            if(!accessToken)
            {
                setMessage('Google認証に失敗しました(credentialが空)');
                return;
            }

            try{
                //Cokieを受け取るにはcredntials:'include'が必要
                const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/testAuthenticate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ accessToken }),
                });

            if(!res.ok)
            {
                const errorData = await res.json();
                setMessage(`ログイン失敗:${errorData.message || ''}`);
                return;
            }

            const data = await res.json();
            setMessage(data.message || 'ログイン成功');
        }catch(error){
            setMessage(`通信エラー:&${error.message}`);
        }
    },
        onError:()=>{
            setMessage('Google認証に失敗しました');
        },
    });

    //画面に返す要素
    return(
        <div>
            <h1>新規登録</h1>
            <button onClick={() => googleSignUp()}>Googleで新規登録</button>
        </div>
    );
}

export default SingUp;