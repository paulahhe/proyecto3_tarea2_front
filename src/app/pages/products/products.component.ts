import { ProductFormComponent } from './../../components/products/product-form/product-form.component';
import { ProductsService } from './../../services/products.service';
import { ProductsListComponent } from './../../components/products/product-list/product-list.component';
import { Component, inject, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { IProduct, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


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
export class ProductsComponent {

  public productsService: ProductsService = inject(ProductsService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;

  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
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
  public routeAuthorities: string[] =  [];

  constructor() {
    this.productsService.search.page = 1;
    //this.authService.isSuperAdmin() ? this.productsService.getAll() : this.productsService.getAllByUser();
  }

  saveProduct(product: IProduct) {
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
  
  updateProduct(product: IProduct) {
    this.productsService.update(product);
    this.modalService.closeAll();
  }

  ngOnInit(): void {
    this.productsService.getAll();
    this.route.data.subscribe(data => {
      const authorities: string[] = data['authorities'] || [];
      this.areActionsAvailable = this.authService.areActionsAvailable(authorities);
    });
  }

  handleFormAction(item: IProduct) {
    this.productsService.save(item);
  }


}
