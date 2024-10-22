import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category-selection.component.html',
  styleUrl: './category-selection.component.scss'
})
export class CategorySelectionComponent {

  category: ICategory = {
    id: undefined,
    name: undefined
  }

  @Input() categories: ICategory[] = [];

  @Output() categoryChange: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  @Input() categorySelection: ICategory = this.category;

  categoryInvalid = false;
  categoryTouched = false;
  

  onCategoryChange(event: Event) {
    const catId = (event.target as HTMLSelectElement).value;
    this.category = this.categories.find(ct => (ct.id?.toString() ?? '') === catId) || {
      id: undefined,
      name: ""
    };
    this.categoryTouched = true;
    this.categoryInvalid = !this.category.id;
    this.emitCategory();
  }


  private emitCategory(){
    this.categoryChange.emit(this.category);
  }


}
