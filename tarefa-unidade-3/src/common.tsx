import { IProductWithKey, IProductApiReturn } from './interfaces';

export function formatPrice(price: number | string): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    typeof price === 'string' ? Number(price) : price
  );
}

export function hasErrorsFromKey(key: string, errorList: string[]): boolean {
  if (errorList.length === 0) return false;
  return errorList[0].startsWith(key);
}

export function normalizeApiReturn(apiReturn: IProductApiReturn): IProductWithKey {
  return { uuid: apiReturn.id, ...apiReturn.fields };
}
