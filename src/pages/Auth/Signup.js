import React from 'react';
import AuthForm from '../../components/auth/AuthForm';

const Signup = ({ onNavigate }) => {
  return <AuthForm isLogin={false} onNavigate={onNavigate} />;
};

export default Signup;
