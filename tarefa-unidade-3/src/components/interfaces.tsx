export interface IProduct {
  price: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  imageLabel?: string;
  outOfStock?: Boolean;
}

export interface ICartItem {
  uuid: string;
  title: string;
  price: Number;
  quantity: Number;
}