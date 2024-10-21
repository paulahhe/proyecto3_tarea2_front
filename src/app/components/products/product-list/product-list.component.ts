import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductsListComponent {
  @Input() title: string  = '';
  @Input() products: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
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