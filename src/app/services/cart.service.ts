import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';
import { LignePanier } from 'src/app/models/ligne-panier.model';
import { SousArticle } from '../models/sousarticle.model';
import { HttpClient } from '@angular/common/http';
import * as URLS from '../../app/commons/url_backend';
import { AuthService } from './auth-service.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  panierListProvider: Subject<LignePanier[]> = new Subject();
  itemsNbProvider: Subject<number> = new Subject();
  panierList: LignePanier[] = new Array<LignePanier>();
  itemsNb: number;
  token: string;
  totalPanierProvider: Subject<number> = new Subject();
  totalPanier: number;
  cartInit = false;
  constructor(
    private datasFromBackendService: DatasFromBackendService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.tokenAuthSubject.subscribe((value) => {
      this.token = value;
    });
    this.itemsNbProvider.next(0);
  }

  ngOnDestroy(): void{

  }

  async updateCart(panierList0: LignePanier[]): Promise<void>{
    for (const lignePanier of this.panierList){
      const lignePanier0 = panierList0.find((ligPanier) => ligPanier.id === lignePanier.id);
      if (lignePanier0){
        if (lignePanier0.quantite !== lignePanier.quantite){
          const response = await this.http.put(URLS.LIGNE_PANIER_RUD_URL + lignePanier.id, {
            s_article: lignePanier.sousarticle.id,
            quantite: lignePanier.quantite,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            }
          }).toPromise();
        }
      }
      else{
        if (lignePanier.quantite !== 1){
          await this.http.put(URLS.LIGNE_PANIER_RUD_URL + lignePanier.id, {
            s_article: lignePanier.sousarticle.id,
            quantite: lignePanier.quantite,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            }
          }).toPromise();
        }
      }
    }
  }


  async initCartList(): Promise<LignePanier[]> {
    const ligsPanier = await this.datasFromBackendService.getLignesPanierList();
    this.panierList = ligsPanier;
    this.panierListProvider.next(this.panierList);
    this.itemsNb = this.countItems();
    this.itemsNbProvider.next(this.itemsNb);
    this.totalPanier = this.totalcart();
    this.totalPanierProvider.next(this.totalPanier);
    this.cartInit = true;
    return ligsPanier;
  }

  countItems(): number {
    let nb = 0;
    for (const item of this.panierList) {
      nb += item.quantite;
    }
    return nb;
  }

  totalcart(): number {
    let total = 0;
    for (const item of this.panierList) {
      total += item.quantite * item.prixunitaire;
    }
    return total;
  }

  addItemToCart(sousarticle: SousArticle): void {
    if (!this.checkIfIsInCart(sousarticle)) {
      this.http
        .post<{
          id: string;
          prixunitaire: number;
          quantite: number;
          panier: number;
          s_article: string;
        }>(
          URLS.LIGNE_PANIER_CREATE_URL,
          {
            s_article: sousarticle.pk,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }
        )
        .toPromise()
        .then((data) => {
          this.datasFromBackendService
            .getLignePanierItem(data.id)
            .then((ligpanier: LignePanier) => {
              this.panierList.push(ligpanier);
              this.panierListProvider.next(this.panierList);
              this.totalPanier += sousarticle.prix;
              this.totalPanierProvider.next(this.totalPanier);
              this.itemsNb += 1;
              this.itemsNbProvider.next(this.itemsNb);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async deleteItemCart(lignepanier: LignePanier): Promise<void> {
    const resdelete = await this.http
      .delete(URLS.LIGNE_PANIER_RUD_URL + lignepanier.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      })
      .toPromise()
      .then((res) => {
        const ind = this.panierList.findIndex(
          (ligpanier) => ligpanier.id === lignepanier.id
        );
        this.panierList.splice(ind, 1);
        this.totalPanier -= lignepanier.quantite * lignepanier.prixunitaire;
        this.itemsNb -= lignepanier.quantite;
        this.itemsNbProvider.next(this.itemsNb);
        this.panierListProvider.next(this.panierList);
        this.totalPanierProvider.next(this.totalPanier);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateQty(element: LignePanier, val: number): void {
    // const lignepanier = this.panierList.find((value) => value.id === element.id);
    // lignepanier.quantite += val;
    this.itemsNb = this.itemsNb + val;
    this.itemsNbProvider.next(this.itemsNb);
    this.panierListProvider.next(this.panierList);
    this.totalPanier += val * element.prixunitaire;
    this.totalPanierProvider.next(this.totalPanier);
  }

  checkIfIsInCart(sousarticle: SousArticle): boolean {
    return (
      this.panierList.findIndex(
        (lignepanier: LignePanier) =>
          lignepanier.sousarticle.id === sousarticle.pk
      ) !== -1
    );
  }
}
