import api from '../../../interceptors/api';

export const register = async (payload: Object) => {
  try {
    const response = await api.post('/api/register', payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};