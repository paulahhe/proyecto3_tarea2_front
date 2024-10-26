import { CategoriesService } from './../../services/categories.service';
import { CategoryFormComponent } from './../../components/categories/category-form/category-form.component';
import { CategoriesListComponent } from './../../components/categories/category-list/category-list.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { ICategory, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  public categoriesService: CategoriesService = inject(CategoriesService);
  
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public routeAuthorities: string[] = [];
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);

  @ViewChild('addCategoryModal') public addCategoryModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor() {
    this.categoriesService.search.page = 1;
    this.categoriesService.getAll();
  }

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoriesService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  saveCategory(category: ICategory) {
    console.log('saveCategory() test:', category)
    this.categoriesService.save(category);
    this.modalService.closeAll();
  }

  callEdition(category: ICategory) {
    this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
    this.categoryForm.controls['name'].setValue(category.name ? category.name : '');
    this.categoryForm.controls['description'].setValue(category.description ? category.description : '');
    this.modalService.displayModal('md', this.addCategoryModal);
  }
  
  updateCategory(category: ICategory) {
    this.categoriesService.update(category);
    this.modalService.closeAll();
  }


}
