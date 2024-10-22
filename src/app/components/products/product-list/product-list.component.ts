import { ProductsService } from './../../../services/products.service';
import { CategoriesService } from './../../../services/categories.service';
import { ProductFormComponent } from '../product-form/product-form.component'
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductsListComponent implements OnChanges {
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Input() areActionsAvailable: boolean = true;
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  public selectedItem: IProduct = {}
  public productService= inject(ProductsService);
  public modalService= inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: IProduct) {
    this.productService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategory(category: IProduct) {
    this.productService.delete(category);
  }
}
