import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";
import { IProduct } from "../interfaces";

interface IKeyedProduct extends IProduct {
  uuid: String
}

@Injectable(({ providedIn: 'root' }))
export class ProductListService {
  private products: Array<IKeyedProduct> = [];
  
  get currentProducts(): Array<IKeyedProduct> {
    return this.products;
  }

  setProducts(newProducts: Array<IProduct>) {
    this.products = newProducts.map(product => ({ ...product, uuid: uuid() }));
  }

  updateProduct(productUUID: String, newData: IProduct) {
    this.products = this.products.map(product => {
      if (product.uuid === productUUID)
        return { ...product, ...newData };
      return product;
    })
  }
}