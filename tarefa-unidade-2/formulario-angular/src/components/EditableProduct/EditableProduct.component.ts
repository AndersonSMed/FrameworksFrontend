import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProduct } from "../interfaces";

@Component({
  selector: 'editable-product',
  templateUrl: './EditableProduct.html',
  styleUrls: ['./EditableProduct.css']
})
export default class EditableProductComponent {
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

  public isEditing = false;

  public setIsEditing(isEditing: boolean) {
    this.isEditing = isEditing;
  }

  public onSaveProduct(newData: IProduct) {
    this.setIsEditing(false);
    this.onSave.emit(newData);
  }
};