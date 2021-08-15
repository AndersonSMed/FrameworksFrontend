import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ProductListService } from './ProductList.service';
import { IProduct } from "../interfaces";

@Component({
  selector: 'product-list',
  templateUrl: './ProductList.html',
  styleUrls: ['./ProductList.css']
})
export default class ProductListComponent implements OnChanges {
  @Input()
  products: Array<IProduct> = [];

  constructor(public productListService: ProductListService) {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes.products)
      this.productListService.setProducts(changes.products.currentValue);
  }
}