import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-categorie-box-list',
  templateUrl: './categorie-box-list.component.html',
  styleUrls: ['./categorie-box-list.component.scss']
})
export class CategorieBoxListComponent implements OnInit {


  currentSubcategoryId: string;
  currentCategory: string;
  currentSubcategory: string;
  categoriesList: Array<Categorie>;
  datasLoaded = false;

  constructor(private datasFromBackendService: DatasFromBackendService, private shopService: ShopService) {
    this.shopService.currentSubCategorySubject.subscribe(subCategory => {
      this.currentSubcategory = subCategory.souscategorie;
      this.currentCategory = subCategory.categorie;
    });
    this.shopService.currentSubCategoryIdSubject.subscribe(id => this.currentSubcategoryId = id);
  }

  ngOnInit(): void {
    this.currentCategory = this.shopService.currentCategory;
    this.currentSubcategory = this.shopService.currentSubcategory;
    this.datasFromBackendService.getCategoriesList().then(categories => {
      this.categoriesList = categories;
      this.datasLoaded = true;
    });
  }

  setCurrentCategory(name: string): void{
    this.currentCategory = name;
  }

  setCurrentSubCategory(name: string, id: string): void{
    this.shopService.currentSubCategorySubject.next({
      categorie: this.currentCategory,
      souscategorie: name
    });
    this.shopService.currentSubCategoryIdSubject.next(id);
  }
}
