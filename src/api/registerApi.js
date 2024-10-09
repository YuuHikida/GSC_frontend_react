// /src/api/registerApi.js

export const postRegisterData = async (formData) => {
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
  