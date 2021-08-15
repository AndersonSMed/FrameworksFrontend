import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { IProduct } from "../interfaces";
import { useYup } from './validators';

@Component({
  selector: 'product-form',
  templateUrl: './ProductForm.html',
  styleUrls: ['./ProductForm.css']
})
export default class ProductFormComponent implements OnChanges{
  @Input()
  price: Number = 0;

  @Input()
  imageSrc: String | undefined;

  @Input()
  title: String = '';

  @Input()
  description: String = '';

  @Output()
  onSave = new EventEmitter<IProduct>();

  public formData: IProduct;

  private error: String | undefined = '';

  private schema = useYup({
    title: {
      type: 'text',
      required: true 
    },
    description: {
      type: 'text',
      required: true 
    },
    price: {
      type: 'number',
      required: true 
    },
    imageSrc: { type: 'url' }
  });

  public getError(field: string) {
    if (this.error && this.error.startsWith(field))
      return this.error.split(' ').slice(1).join(' ');
    return;
  }

  public handleFormChange() {
    this.schema
      .validate(this.formData)
      .then(() => this.error = undefined)
      .catch((err) => this.error = err && err.message);
  }

  constructor() {
    this.formData = {
      price: this.price,
      imageSrc: this.imageSrc,
      title: this.title,
      description: this.description
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.price)
      this.formData.price = changes.price.currentValue;
    if (changes.imageSrc)
      this.formData.imageSrc = changes.imageSrc.currentValue;
    if (changes.title)
      this.formData.title = changes.title.currentValue;
    if (changes.description)
      this.formData.description = changes.description.currentValue;
  }
}