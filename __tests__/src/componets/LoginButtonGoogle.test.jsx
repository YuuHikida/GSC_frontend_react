// // __tests__/components/LoginButtonGoogle.test.jsx

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import LoginButtonGoogle from '../../src/components/LoginButtonGoogle';

// // authenticateUserをモック
// jest.mock('../../src/api/authApi.jsx', () => ({
//   authenticateUser: jest.fn()
// }));

// // Firebase関連をモック
// jest.mock('firebase/auth', () => ({
//   GoogleAuthProvider: jest.fn(),
//   signInWithPopup: jest.fn().mockResolvedValue({
//     user: {
//       getIdToken: jest.fn().mockResolvedValue('mockIdToken')
//     }
//   })
// }));

// import { authenticateUser } from '../../src/api/authApi.jsx';
// import { signInWithPopup } from 'firebase/auth';

// describe('LoginButtonGoogle', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('初期表示ではログインメッセージとボタンがある', () => {
//     render(<LoginButtonGoogle />);
//     expect(screen.getByText('ログインしてください')).toBeInTheDocument();
//     expect(screen.getByText('ここにGoogole認証ボタンを設置!!!')).toBeInTheDocument();
//   });

//   test('Googleボタンをクリックしてバックエンド送信が成功したら成功メッセージが表示される', async () => {
//     authenticateUser.mockResolvedValue('バックエンドレスポンス');

//     render(<LoginButtonGoogle />);
//     fireEvent.click(screen.getByText('ここにGoogole認証ボタンを設置!!!'));

//     await waitFor(() => {
//       expect(signInWithPopup).toHaveBeenCalled();
//       expect(authenticateUser).toHaveBeenCalledWith('mockIdToken');
//       expect(screen.getByText('正常にバックエンドに送信完了')).toBeInTheDocument();
//     });
//   });

//   test('バックエンド送信が失敗した場合は成功メッセージは表示されない', async () => {
//     authenticateUser.mockRejectedValue(new Error('バックエンドエラー'));

//     render(<LoginButtonGoogle />);
//     fireEvent.click(screen.getByText('ここにGoogole認証ボタンを設置!!!'));

//     await waitFor(() => {
//       expect(signInWithPopup).toHaveBeenCalled();
//       expect(authenticateUser).toHaveBeenCalledWith('mockIdToken');
//       expect(screen.queryByText('正常にバックエンドに送信完了')).not.toBeInTheDocument();
//     });
//   });
// });
