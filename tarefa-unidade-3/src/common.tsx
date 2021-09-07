import { IProductWithKey, IProductApiReturn, IProduct } from './interfaces';

export function formatPrice(price: number | string): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    typeof price === 'string' ? Number(price) : price
  );
}

export function hasErrorsFromKey(key: string, errorList: string[]): boolean {
  if (errorList.length === 0) return false;
  return errorList[0].startsWith(key);
}

export function normalizeApiProducts(apiReturn: IProductApiReturn): IProductWithKey {
  return { productId: apiReturn.id, ...apiReturn.fields };
}

export function getProductWithoutId(product: IProductWithKey): IProduct {
  return Object.entries(product).reduce(
    (acc, [key, value]) => (key === 'productId' ? acc : { ...acc, [key]: value }),
    { price: 0, title: '', description: '' }
  );
}
