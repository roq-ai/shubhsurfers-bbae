import axios from 'axios';
import queryString from 'query-string';
import { ProductOrderInterface, ProductOrderGetQueryInterface } from 'interfaces/product-order';
import { GetQueryInterface } from '../../interfaces';

export const getProductOrders = async (query?: ProductOrderGetQueryInterface) => {
  const response = await axios.get(`/api/product-orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProductOrder = async (productOrder: ProductOrderInterface) => {
  const response = await axios.post('/api/product-orders', productOrder);
  return response.data;
};

export const updateProductOrderById = async (id: string, productOrder: ProductOrderInterface) => {
  const response = await axios.put(`/api/product-orders/${id}`, productOrder);
  return response.data;
};

export const getProductOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/product-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProductOrderById = async (id: string) => {
  const response = await axios.delete(`/api/product-orders/${id}`);
  return response.data;
};
