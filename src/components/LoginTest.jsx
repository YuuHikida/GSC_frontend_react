export const responseTest = await fetch("http://localhost:8080/receiveJwt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: "your_jwt_token" }),
  });
  
  const result = await response.text(); // テキストとしてレスポンスを取得
  console.log(result); // "JWTを受け取りました！" と表示される
  