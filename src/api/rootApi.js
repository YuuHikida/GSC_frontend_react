export const fetchRootData = async () => {
    try {
      // 'await' は 'fetch' がデータを取得してくるまで待機する
      const response = await fetch('http://localhost:8080/');
      // 'await' は 'response.json()' がJSONデータに変換されるまで待機する
      const jsonData = await response.json();
      // データが取得できたら、結果を返す
      return jsonData;
    } catch (error) {
      // エラーが発生した場合はコンソールにエラーメッセージを表示し、エラーを再度投げる
      console.error('Error fetching root data:', error);
      throw error;
    }
  };
  