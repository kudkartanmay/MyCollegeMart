import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // It imports the context

// This is the one and only place useAuth should be defined
export const useAuth = () => {
    return useContext(AuthContext);
};