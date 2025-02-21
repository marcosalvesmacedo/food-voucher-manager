import { useState } from 'react';
import { login } from '../services/loginService';
import { register } from '../services/registerService';
import { recovery } from '../services/recoveryService';

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
        if ( err.status === 500 ) {
          setError('Erro 500');
        }
        if ( err.status === 401 ) {
          setError(err.response.data.message);
        }
        throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload: Object) => {
    setLoading(true);
    setError(null);

    try {
      const registerData = await register(payload);

      sessionStorage.setItem('token', registerData.token);

      return registerData;
    } catch (err: any) {
      if ( err.status === 500 ) {
        setError('Erro 500');
      }
      if ( err.status === 420 ) {
        setError(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = async (payload: Object) => {
    setLoading(true);
    setError(null);

    try {
      const recoveryData = await recovery(payload);

      sessionStorage.setItem('token', recoveryData.token);
      return recoveryData;
    } catch (err: any) {
      if ( err.status === 500 ) {
        setError('Erro 500');
      }
      if ( err.status === 420 ) {
        setError(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleRecovery, loading, error };
};