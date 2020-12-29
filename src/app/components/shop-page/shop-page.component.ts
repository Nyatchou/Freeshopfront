import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleListResponse } from 'src/app/models/articleslistresponse.model';
import { SousCategorie } from 'src/app/models/souscategorie.model';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';
import { ShopService } from 'src/app/services/shop.service';
import {ARTICLES_LIST_PAGE_SIZE} from 'src/app/commons/url_backend';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  currentSubcategoryId: string;
  currentCategory: string;
  currentSubcategory: string;
  currentArticleslist: Array<Article>;
  currentPageNb = 1;
  articlesPages: Array<number> = new Array();
  maxPrice = 1000000;
  minPrice = 0;
  sortType = 'Par défaut';
  querySearch = '';
  emptyStock = false;

  constructor(
    private datasFromBackendService: DatasFromBackendService,
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {
    this.shopService.currentSubCategorySubject.subscribe((souscateg) => {
      this.currentSubcategory = souscateg.souscategorie;
      this.currentCategory = souscateg.categorie;
    });
    this.shopService.currentSubCategoryIdSubject.subscribe((id) => {
      this.currentSubcategoryId = id;
      this.setSubCategory(id);
    });
  }

  ngOnInit(): void {

      this.currentSubcategoryId = this.shopService.currentSubCategId;

      if (this.currentCategory && this.currentSubcategory) {
        this.datasFromBackendService
          .getArticlesList(this.currentSubcategory, this.currentCategory)
          .then((articleslist: ArticleListResponse) => {
            this.currentArticleslist = articleslist.articleslist;
            this.setPageList(articleslist.count);
            this.emptyStock = articleslist.articleslist.length === 0;
          });
      }
      else {
        if (this.currentSubcategoryId) {
          this.datasFromBackendService
            .getArticlesFromSC(this.currentSubcategoryId)
            .then((articleslist: ArticleListResponse) => {
              this.currentArticleslist = articleslist.articleslist;
              this.setPageList(articleslist.count);
              this.emptyStock = articleslist.articleslist.length === 0;
          });
        }
    }
  }

  // setSubCategory(subcateg: { name: string; id: string }): void {
  //   let paramquery = '?ordering=';
  //   switch (this.sortType) {
  //     case 'Prix: croissant':
  //       paramquery += 'prix_present';
  //       break;
  //     case 'Prix: décroissant':
  //       paramquery += '-prix_present';
  //       break;
  //     default:
  //       paramquery = undefined;
  //       break;
  //   }

  //   this.shopService.currentSubCategorySubject.next(subcateg.name);
  //   this.shopService.currentSubCategoryId.next(subcateg.id);
  //   this.datasFromBackendService
  //     .getArticlesFromSC(subcateg.id, paramquery)
  //     .then((articleslist: ArticleListResponse) => {
  //       this.currentArticleslist = articleslist.articleslist;
  //       this.emptyStock = this.currentArticleslist.length === 0;
  //     });
  // }

  onGoToPage(nb: number): void{
    this.setSubCategory(this.currentSubcategoryId, nb);
  }

  setSubCategory(id: string, page: number = 1): void {
    this.currentPageNb = page;
    let paramquery = '?page=' + page;
    switch (this.sortType) {
      case 'Prix: croissant':
        paramquery += '&ordering=prix_present';
        break;
      case 'Prix: décroissant':
        paramquery += '&ordering=-prix_present';
        break;
    }

    this.datasFromBackendService
      .getArticlesFromSC(id, paramquery)
      .then((articleslist: ArticleListResponse) => {
        this.currentArticleslist = articleslist.articleslist;
        this.setPageList(articleslist.count);
        this.emptyStock = this.currentArticleslist.length === 0;
      });
  }

  setPageList(countArticles: number): void{
    if (countArticles / ARTICLES_LIST_PAGE_SIZE > 1){
      this.articlesPages = new Array();
      const pagesNb = countArticles / ARTICLES_LIST_PAGE_SIZE;
      for (let i = 1; i < pagesNb + 1; i++){
        this.articlesPages.push(i);
      }
    }
  }

  changeSortType(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.sortType = val;
    let paramquery = '?page=' + this.currentPageNb;
    switch (this.sortType) {
      case 'Prix: croissant':
        paramquery += '&ordering=prix_present';
        break;
      case 'Prix: décroissant':
        paramquery += '&ordering=-prix_present';
        break;
    }
    this.datasFromBackendService
      .getArticlesFromSC(this.currentSubcategoryId, paramquery)
      .then((articleslist: ArticleListResponse) => {
        this.currentArticleslist = articleslist.articleslist;
        this.setPageList(articleslist.count);
        this.emptyStock = this.currentArticleslist.length === 0;
      });
  }

}
