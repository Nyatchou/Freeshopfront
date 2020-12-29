import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';

@Component({
  selector: 'app-categories-items-group',
  templateUrl: './categories-items-group.component.html',
  styleUrls: ['./categories-items-group.component.scss']
})
export class CategoriesItemsGroupComponent implements OnInit {

  categoriesList!: Array<Categorie>;
  datasLoaded = false;
  constructor(private datasFromBackendService: DatasFromBackendService, private router: Router) { }

  ngOnInit(): void {
    this.datasFromBackendService.getCategoriesList().then(categories => {
      this.categoriesList = categories;
      this.datasLoaded = true;
    });
  }

}
