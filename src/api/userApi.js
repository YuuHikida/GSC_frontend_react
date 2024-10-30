/*
概要:ユーザー(mongoDBAtlas)の全件取得
*/ 

export const AllGetUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
  /*
  概要:ユーザーの登録
  */
  export const RegisterData = async (formData) => {
    try {
      // 'await' は 'fetch' がサーバーにデータを送信し、レスポンスを待機するまで待つ
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // フォームデータをJSON形式に変換して送信
      });
      // 確認
      console.log(JSON.stringify(formData))//{"git_name":"hhh","mail":"www@aa","time":"01:15"}
  
      // レスポンスが正常かチェック
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.statusText}`);
      }
  
      // レスポンスをJSON形式に変換して返す
      const textData = await response.text();
      /* 
        const jsonData = await response.json();
        return jsonData;
      */
      return textData;
    } catch (error) {
      console.error('Error posting register data:', error);
      throw error;  // エラーを投げて上位でハンドリングできるようにする
    }
  };