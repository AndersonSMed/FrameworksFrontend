/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../interfaces';

const ENDPOINT = 'https://api.airtable.com/v0/appbgdYpI9wgVL5fM/Products';
const getHeaders = () => {
  const token: string = process.env.REACT_APP_AIRTABLE_API_TOKEN || '';

  if (!token)
    throw new Error('Please, set the REACT_APP_AIRTABLE_API_TOKEN environment on your .env file');

  return { Authorization: `Bearer ${token}` };
};

export function listProducts(): Promise<AxiosResponse<any>> {
  return axios.get(ENDPOINT, { headers: getHeaders() });
}

export function createProduct(data: IProduct): Promise<AxiosResponse<any>> {
  return axios.post(ENDPOINT, { headers: getHeaders(), data: { records: [{ fields: data }] } });
}

export function updateProduct(id: string, data: IProduct): Promise<AxiosResponse<any>> {
  return axios.put(ENDPOINT, {
    headers: getHeaders(),
    data: { records: [{ id, fields: data }] },
  });
}
