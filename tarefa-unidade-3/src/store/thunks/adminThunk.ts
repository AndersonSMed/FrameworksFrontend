/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createProduct, deleteProduct, listProducts, updateProduct } from '../../api/products';
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
    toast.error('There was an error while loading the products, try again later');
    console.error(error);
  } finally {
    dispatch(updateIsLoading(false));
  }
};

export const createAdminProduct = (newProduct: IProduct) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(updateIsLoading(true));
    await createProduct(newProduct);
    toast.success('Product successfully created!');
    dispatch(loadAdminProducts());
  } catch (error) {
    toast.error('There was an error while creating the product, try again later');
    console.error(error);
    dispatch(updateIsLoading(false));
  }
};

export const updateAdminProduct =
  (productId: string, productData: IProduct) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(updateIsLoading(true));
      await updateProduct(productId, productData);
      toast.success('Product successfully updated!');
      dispatch(loadAdminProducts());
    } catch (error) {
      toast.error('There was an error while updating the product, try again later');
      console.error(error);
      dispatch(updateIsLoading(false));
    }
  };

export const deleteAdminProduct = (productId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(updateIsLoading(true));
    await deleteProduct(productId);
    toast.success('Product successfully deleted!');
    dispatch(loadAdminProducts());
  } catch (error) {
    toast.error('There was an error while deleting the product, try again later');
    console.error(error);
    dispatch(updateIsLoading(false));
  }
};
