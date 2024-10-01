import React, { useState } from 'react';
import { postRegisterData } from '../api/registerApi';

function RegisterForm() {
  const [formData, setFormData] = useState({
    git_name: '',
    mail: '',
    time: ''
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
    
    try {
      const response = await postRegisterData(formData);
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
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        placeholder="時間"
      />
      <button type="submit">登録</button>
    </form>
  );
}

export default RegisterForm;
