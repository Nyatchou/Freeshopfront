import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  currentSubCategorySubject: Subject<{categorie: string, souscategorie: string}> = new Subject();
  currentSubCategoryIdSubject: Subject<string> = new Subject();
  currentSubCategId: string;
  currentCategory: string;
  currentSubcategory: string;
  constructor() {
    this.currentSubCategoryIdSubject.subscribe((id) => {
      this.currentSubCategId = id;
    });
    this.currentSubCategorySubject.subscribe((subcateg) => {
      this.currentSubcategory = subcateg.souscategorie;
      this.currentCategory = subcateg.categorie;
    });
    this.currentSubCategId = '1';
    this.currentSubcategory = 'Tennis-montante';
    this.currentCategory = 'Chaussures Homme';
  }



}
