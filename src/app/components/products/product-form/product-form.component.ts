import { CategorySelectionComponent } from './../../categories/category-selection/category-selection.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategory, IProduct } from '../../../interfaces';
import { CategoriesService } from '../../../services/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  public fb: FormBuilder = inject(FormBuilder);

  @Input() productForm!: FormGroup;
  @Input() toUpdateProduct: IProduct = {};
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();


  callSave() {
    let product: IProduct = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      inStock: this.productForm.controls['inStock'].value,
      idCategoria: this.productForm.controls['category'].value
    }
    if(this.productForm.controls['id'].value) {
      product.id = this.productForm.controls['id'].value;
    } 
    if(product.id) {
      this.callUpdateMethod.emit(product); //UPDATE  METHOD
    } else {
      this.callSaveMethod.emit(product);
    }
  }
  
  addEdit()  {
    this.callUpdateMethod.emit(this.toUpdateProduct);
  }
}
