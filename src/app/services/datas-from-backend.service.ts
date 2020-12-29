import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as URLS from '../../app/commons/url_backend';
import { CategHome } from '../models/categ-home.model';
import { Categorie } from '../models/categorie.model';
import { ArticleExpanded } from '../models/article-expanded.model';
import {Article} from '../models/article.model';
import { LignePanier } from '../models/ligne-panier.model';
import { AuthService } from './auth-service.service';
import { SousCategorie } from '../models/souscategorie.model';
import { ArticleListResponse } from '../models/articleslistresponse.model';



@Injectable({
  providedIn: 'root'
})
export class DatasFromBackendService {

  token: string = localStorage.getItem('access');
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.tokenAuthSubject.subscribe((value) => {
      this.token = value;
    });
  }

  async getCategoriesHomeList(): Promise<CategHome[]>{
    const response = await this.http.get<Array<any>>(URLS.CATEGSHOME_LIST_URL, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();
    const categshome = new Array<CategHome>();
    response.forEach((data) => {
      categshome.push(CategHome.create_from_responsedata(data));
    });
    return categshome;
  }

  async getCategoriesList(): Promise<Categorie[]>{
    const response = await this.http.get<Array<any>>(URLS.CATEGORIES_LIST_URL, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();

    const categorylist = new Array<Categorie>();
    response.forEach((data) => {
      categorylist.push(Categorie.create_from_responsedata(data));
    });
    return categorylist;
  }

  async getArticlesList(souscategorie: string, categorie: string): Promise<ArticleListResponse>{
    const response = await this.http.get<{
      count: number,
      next: string,
      previous: string,
      results: []
    }>(URLS.ARTICLES_LIST_SHOP_URL + categorie + '/' + souscategorie, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();

    const articlesList = new Array<Article>();
    response.results.forEach((data) => {
      articlesList.push(Article.create_from_responsedata(data));
    });
    return {count: response.count, articleslist: articlesList};
  }

  async getSingleArticleDatas(id: string): Promise<ArticleExpanded>{
    const response = await this.http.get(URLS.ARTICLE_EXPANDED_URL + id, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();
    const article = ArticleExpanded.create_from_responsedata(response);
    return article;
  }

  async getArticlesFromSC(idsc: string, paramquery?: string): Promise<ArticleListResponse>{
    const param = paramquery === undefined ? '' : paramquery;

    const response = await this.http.get<{
      count: number,
      next: string,
      previous: string,
      results: []
    }>(URLS.ARTICLES_FROM_SOUSCATEGORIE_URL + idsc + param, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();

    const articlesList = new Array<Article>();

    response.results.forEach((data) => {
      articlesList.push(Article.create_from_responsedata(data));
    });
    return {count: response.count, articleslist: articlesList};
  }

  async getLignesPanierList(): Promise<LignePanier[]>{
    const response = await this.http.get<Array<LignePanier>>(URLS.PANIER_ELTS_URL, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();
    const lignespanierlist = new Array<LignePanier>();
    response.forEach((data: LignePanier) => {
      data.sousarticle.image_url = URLS.HOST_URL + data.sousarticle.image_url
      lignespanierlist.push(data);
    });
    return lignespanierlist;
  }
  async getLignePanierItem(id: string): Promise<LignePanier>{
    const lignePanier = await this.http.get<LignePanier>(URLS.LIGNE_PANIER_RUD_URL + id, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    }).toPromise();
    lignePanier.sousarticle.image_url = URLS.HOST_URL + lignePanier.sousarticle.image_url;
    return lignePanier;
  }


}
