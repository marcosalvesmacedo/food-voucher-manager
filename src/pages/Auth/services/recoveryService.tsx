import api from '../../../interceptors/api';

export const recovery = async (payload: Object) => {
  try {
    const response = await api.post('/api/recovery', payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};