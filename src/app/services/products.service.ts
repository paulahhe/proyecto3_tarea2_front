import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import {IProduct, ISearch } from '../interfaces';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<IProduct> {
  protected override source: string = 'products'; //Viene de mi clase products del backend
  private productListSignal = signal<IProduct[]>([]); //Lista vacias para que nuestro codigo de componente reacciona a los cambios

  get products$() { //Obtener el valor de signal cada vez que cambia
    return this.productListSignal;
  }

  public search: ISearch = { 
    page: 1,
    size: 10
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService); //Esto es para llamar al usuario
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.productListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(product: IProduct) {
    this.add(product).subscribe({
      next: (response: any) => {
        this.productListSignal.update((products: IProduct[]) => [response, ...products]);
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the product','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(product: IProduct) {
    this.editCustomSource(`${product.id}`, product).subscribe({
      next: (response: any) => {
        //this.productListSignal.update((products: IProduct[]) => [response, ...products]);
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the product','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(product: IProduct) {
    this.delCustomSource(`${product.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the product','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
