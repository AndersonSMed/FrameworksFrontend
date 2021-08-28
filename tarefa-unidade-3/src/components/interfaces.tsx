export interface IProduct {
  price: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  imageLabel?: string;
  outOfStock?: boolean;
}

export interface IProductWithKey extends IProduct {
  uuid: string;
}

export interface ICartItem {
  uuid: string;
  title: string;
  price: number;
  quantity: number;
}
