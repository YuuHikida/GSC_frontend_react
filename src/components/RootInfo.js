import React from 'react';

const RootInfo = ({ data }) => (
    <div>
    <h1>ユーザー情報</h1>
    <p><strong>ID:</strong> {data._id}</p>
    <p><strong>名前:</strong> {data.git_name}</p>
    <p><strong>メール:</strong> {data.mail}</p>
    <p><strong>時間:</strong> {data.time}</p>
    </div>
);

export default RootInfo;

