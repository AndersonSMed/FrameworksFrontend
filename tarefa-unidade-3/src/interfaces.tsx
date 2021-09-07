export interface IProduct {
  price: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  imageLabel?: string;
  outOfStock?: boolean;
}

export interface IProductWithKey extends IProduct {
  productId: string;
}

export interface IProductApiReturn {
  id: string;
  fields: IProduct;
}

export interface ICartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export type TCartAction = 'add' | 'remove' | 'delete';
