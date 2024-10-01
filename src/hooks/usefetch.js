// API呼び出しをカプセル化するカスタムフック
//データの取得、ローディング状態、エラーハンドリングを一箇所で管理
import { useState, useEffect } from 'react';

export const useFetch = (apiFunc) => {
  /*
  useState は値を保存する変数と、それを変更する関数を提供し、
  その変更関数を利用して値を変えたら、
  その値に依存する部分だけを再レンダリングしてブラウザに再計算して表示する。
  */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFunc();
        console.log("Fetched data:", result);  // デバッグ用に追加
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunc]);

  return { data, loading, error };
};
