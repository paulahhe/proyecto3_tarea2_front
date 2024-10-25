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
  public categories: ICategory[] = []; // para fetch categories
  
  @Input() productForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  ngOnInit() {
    this.categoryService.getAll(); // Call getAll to fetch categories
  }  

  callSave() {
    console.log('Save button clicked')
    let product: IProduct = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      inStock: this.productForm.controls['inStock'].value,
      idCategoria: { id: this.productForm.controls['category'].value } //Prueba obj
      //idCategoria: this.productForm.controls['category'].value 

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
