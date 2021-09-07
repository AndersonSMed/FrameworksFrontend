/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../interfaces';

export const API_URL = 'https://api.airtable.com/v0/appbgdYpI9wgVL5fM/Products';
const getHeaders = () => {
  const token: string = process.env.REACT_APP_AIRTABLE_API_TOKEN || '';

  if (!token)
    throw new Error('Please, set the REACT_APP_AIRTABLE_API_TOKEN environment on your .env file');

  return { Authorization: `Bearer ${token}` };
};

axios.defaults.headers = getHeaders();

export function listProducts(): Promise<AxiosResponse<any>> {
  return axios.get(API_URL);
}

export function createProduct(productData: IProduct): Promise<AxiosResponse<any>> {
  return axios.post(API_URL, { records: [{ fields: productData }] });
}

export function deleteProduct(productId: string): Promise<AxiosResponse<any>> {
  return axios.delete(API_URL, {
    params: { records: [productId] },
  });
}

export function updateProduct(
  productId: string,
  productData: IProduct
): Promise<AxiosResponse<any>> {
  return axios.put(API_URL, {
    records: [{ id: productId, fields: productData }],
  });
}
