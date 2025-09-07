import React from 'react';
import AuthForm from '../../components/auth/AuthForm';

const Login = ({ onNavigate }) => {
  return <AuthForm isLogin={true} onNavigate={onNavigate} />;
};

export default Login;
