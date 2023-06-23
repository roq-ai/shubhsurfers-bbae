import axios from 'axios';
import queryString from 'query-string';
import { UserProductInterface, UserProductGetQueryInterface } from 'interfaces/user-product';
import { GetQueryInterface } from '../../interfaces';

export const getUserProducts = async (query?: UserProductGetQueryInterface) => {
  const response = await axios.get(`/api/user-products${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserProduct = async (userProduct: UserProductInterface) => {
  const response = await axios.post('/api/user-products', userProduct);
  return response.data;
};

export const updateUserProductById = async (id: string, userProduct: UserProductInterface) => {
  const response = await axios.put(`/api/user-products/${id}`, userProduct);
  return response.data;
};

export const getUserProductById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-products/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserProductById = async (id: string) => {
  const response = await axios.delete(`/api/user-products/${id}`);
  return response.data;
};
