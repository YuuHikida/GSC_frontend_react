import React, { useState } from 'react';
import { postRegisterData } from '../api/registerApi';

function RegisterForm() {
  // 初期化
  const [formData, setFormData] = useState({
    git_name: '',
    mail: '',
    hour: '00',  // 時間の初期値
    minute: '00',  // 分の初期値
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 時間と分を組み合わせた "HH:MM" の形式で送信する
    const time = `${formData.hour}:${formData.minute}`;
    const dataToSend = {
      git_name: formData.git_name,
      mail: formData.mail,
      time: time,
    };

    try {
      const response = await postRegisterData(dataToSend);
      console.log('登録成功:', response);
    } catch (error) {
      console.error('登録失敗:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="git_name"
        value={formData.git_name}
        onChange={handleChange}
        placeholder="Git 名前"
      />
      <input
        type="email"
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        placeholder="メールアドレス"
      />
      {/* 時間設定部品*/}{/* formData={formData}　はプロップス親から子へ*/}
      <TimeSelector formData={formData}  handleChange={handleChange}/>

      <button type="submit">登録</button>
    </form>
  );
}

export default RegisterForm;

/*
イメージ図
[RegisterForm]
  ├── state: formData
  │     ├── git_name
  │     ├── mail
  │     ├── hour
  │     └── minute
  ├── function: handleChange()
  └── renders:
      ├── <input name="git_name" ... />
      ├── <input name="mail" ... />
      └── <TimeSelector formData={formData} handleChange={handleChange} />

[TimeSelector]
  ├── props: formData, handleChange
  └── renders:
      ├── <select name="hour" value={formData.hour} onChange={handleChange}>
      └── <select name="minute" value={formData.minute} onChange={handleChange}>

*/
