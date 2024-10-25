import { ProductFormComponent } from './../../components/products/product-form/product-form.component';
import { ProductsService } from './../../services/products.service';
import { ProductsListComponent } from './../../components/products/product-list/product-list.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { IProduct, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductsListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  public productsService: ProductsService = inject(ProductsService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public routeAuthorities: string[] = [];
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public categoryService = inject(CategoriesService);

  @ViewChild('addProductModal') public addProductModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    inStock: ['', Validators.required],
    idCategoria: ['', Validators.required],
  })

  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
    this.categoryService.getAll();

    //this.authService.isSuperAdmin();
  }

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.productsService.getAll();
    this.categoryService.getAll(); //para fetch categories
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  saveProduct(product: IProduct) {
    console.log('product', product)
    this.productsService.save(product);
    this.modalService.closeAll();
  }

  callEdition(product: IProduct) {
    this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productForm.controls['name'].setValue(product.name ? product.name : '');
    this.productForm.controls['description'].setValue(product.description ? product.description : '');
    this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
    this.productForm.controls['inStock'].setValue(product.inStock ? JSON.stringify(product.inStock) : '');
    this.productForm.controls['idCategoria'].setValue(product.idCategoria ? JSON.stringify(product.idCategoria) : '');
    this.modalService.displayModal('md', this.addProductModal);
  }
  
  updateProduct(product: IProduct) { //OnFormEvent
    this.productsService.update(product);
    this.modalService.closeAll();
  }

}
