import { CategoriesComponent } from './../../../pages/categories/categories.component';
import { CategorySelectionComponent } from './../../categories/category-selection/category-selection.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
export class ProductFormComponent implements OnInit {

  public fb: FormBuilder = inject(FormBuilder);

  categoryService = inject(CategoriesService);
  
  @Input() productForm!: FormGroup;
  @Input() categories: ICategory[]=[];
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  //@Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  ngOnInit() {
  }

  callSave() {
    console.log('Save button clicked')
    let product: IProduct = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      inStock: this.productForm.controls['inStock'].value,
      category: this.productForm.controls['category'].value
      //idCategoria: { id: this.productForm.controls['category'].value } //Prueba obj

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

}
