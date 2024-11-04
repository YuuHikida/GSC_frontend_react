import { GoogleLogin } from '@react-oauth/google';

const LoginButton = () => {
  const handleSuccess = (response) => {
    const token = response.credential;
    console.log("IDトークン:", token);
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
};

export default LoginButton;
