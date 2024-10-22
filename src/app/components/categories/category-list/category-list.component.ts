import { CategoryFormComponent } from './../category-form/category-form.component';
import { CategoriesService } from './../../../services/categories.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { IAuthority, ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoriesListComponent implements OnChanges {
  @Input() title: string  = '';
  @Input() categories: ICategory[] = [];
  @Input() areActionsAvailable: boolean = true;
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  public selectedItem: ICategory = {};
  private categoryService = inject(CategoriesService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: ICategory) {
    this.categoryService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategory(category: ICategory) {
    this.categoryService.delete(category);
  }
  

}
