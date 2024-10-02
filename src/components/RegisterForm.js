import React, { useState } from 'react';
import { postRegisterData } from '../api/registerApi';

function RegisterForm() {
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

  // 時間選択肢（0〜12）
  const generateHourOptions = () => {
    const hours = [];
    for (let hour = 0; hour <= 12; hour++) {
      const formattedHour = String(hour).padStart(2, '0');  // 2桁にする
      hours.push(formattedHour);
    }
    return hours;
  };

  // 分選択肢（0, 15, 30）
  const generateMinuteOptions = () => {
    return ['00', '15', '30'];  // 分はこの3つのみ
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

      {/* 時間選択（0〜12時） */}
      <select name="hour" value={formData.hour} onChange={handleChange}>
        {generateHourOptions().map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>

      {/* 分選択（0, 15, 30） */}
      <select name="minute" value={formData.minute} onChange={handleChange}>
        {generateMinuteOptions().map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>

      <button type="submit">登録</button>
    </form>
  );
}

export default RegisterForm;
