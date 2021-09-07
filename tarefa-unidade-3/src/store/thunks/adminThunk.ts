/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createProduct, listProducts } from '../../api/products';
import { normalizeApiProducts } from '../../common';
import { IProduct, IProductApiReturn } from '../../interfaces';
import { updateIsLoading, updateProducts } from '../slices/adminSlice';

export const loadAdminProducts = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(updateIsLoading(true));
    const response = await listProducts();
    const products = response.data.records as Array<IProductApiReturn>;
    const normalizedProducts = products.map(normalizeApiProducts);

    dispatch(updateProducts(normalizedProducts));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(updateIsLoading(false));
  }
};

export const createAdminProduct = (newProduct: IProduct) => async (dispatch: Dispatch<any>) => {
  try {
    await createProduct(newProduct);
    toast('Product successfully created!');
    dispatch(loadAdminProducts());
  } catch (error) {
    console.log(error);
  }
};
