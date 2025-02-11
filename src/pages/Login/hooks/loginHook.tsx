import { useState } from 'react';
import { login } from './../services/loginService';

export const useAuth = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await login(email, password);

      sessionStorage.setItem('token', userData.token);

      return userData;
    } catch (err: any) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};