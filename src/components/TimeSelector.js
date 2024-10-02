// userの時間設定部品
import React from 'react';


const TimeSelector = ({ formData, handleChange }) => {
    /* ------ 時間部品(HH & MM) ------ */
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
    /* ------------------------------- */

    return (
        <div>
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
        </div>
    );
};

export default TimeSelector;