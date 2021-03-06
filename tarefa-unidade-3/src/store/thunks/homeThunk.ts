/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { listProducts } from '../../api/products';
import { normalizeApiProducts } from '../../common';
import { IProductApiReturn } from '../../interfaces';
import { updateIsLoading, updateProducts } from '../slices/homeSlice';

export const loadHomeProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(updateIsLoading(true));
    const response = await listProducts();
    const products = response.data.records as Array<IProductApiReturn>;
    const normalizedProducts = products.map(normalizeApiProducts);

    dispatch(updateProducts(normalizedProducts));
  } catch (error) {
    toast.error('There was an error while loading the products, try again later');
    console.error(error);
  } finally {
    dispatch(updateIsLoading(false));
  }
};
