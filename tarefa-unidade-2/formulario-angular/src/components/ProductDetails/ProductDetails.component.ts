import { Component, Input } from "@angular/core";

@Component({
  selector: 'product-details',
  templateUrl: './ProductDetails.html',
  styleUrls: ['./ProductDetails.css']
})
export default class ProductDetailsComponent {
  @Input()
  price: Number = 0;

  @Input()
  imageSrc: String | undefined;

  @Input()
  title: String = '';

  @Input()
  description: String = '';

  public formatPrice(price: Number) {
    const parsedPrice = parseFloat(price.toString());
    return `R$ ${parsedPrice.toFixed(2)}`;
  }
}