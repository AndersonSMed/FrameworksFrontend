export interface ProductInterface {
  price: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  imageLabel?: string;
  outOfStock?: Boolean;
}