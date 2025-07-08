import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // adjust as needed
});

export const checkAccess = async (address: string) => {
  const response = await api.get('/check-access', { params: { address } });
  return response.data;
};

export const mintSBT = async (wallet: string) => {
  const response = await api.post('/mint-sbt', { wallet_address: wallet });
  return response.data;
};

export const revokeSBT = async (wallet: string) => {
  const response = await api.post('/revoke-sbt', { wallet_address: wallet });
  return response.data;
};
