import React, { useState } from 'react';
import { postRegisterData } from '../api/registerApi';

function RegisterForm() {
  const [formData, setFormData] = useState({
    git_name: '',
    mail: '',
    time: '00:00'
  });


  // 15分単位の時間を生成する関数
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

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

     {/* 時間選択（15分単位） */}
     <select name="time" value={formData.time} onChange={handleChange}>
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <button type="submit">登録</button>
    </form>
  );
}

export default RegisterForm;
