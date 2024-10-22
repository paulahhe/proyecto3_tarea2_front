import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ICategory } from '../../../interfaces';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoriesListComponent {
  @Input() title: string  = '';
  @Input() categories: ICategory[] = [];

  @Input() areActionsAvailable: boolean = true;
  
  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
}

/*constructor() {
  console.log('title', this.title);
}
ngOnInit(): void {
  console.log('ngOnInit', this.title);
}
ngAfterViewInit(): void {
  console.log('ngAfterViewInit', this.title);
}
ngOnChanges(changes: SimpleChanges): void {
  console.log('ngOnChanges', changes['title'].currentValue);
}*/