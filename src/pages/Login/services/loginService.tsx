import api from '../../../interceptors/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};