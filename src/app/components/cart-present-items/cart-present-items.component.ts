import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { LignePanier } from 'src/app/models/ligne-panier.model';
import { CartService } from 'src/app/services/cart.service';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';

@Component({
  selector: 'app-cart-present-items',
  templateUrl: './cart-present-items.component.html',
  styleUrls: ['./cart-present-items.component.scss'],
})
export class CartPresentItemsComponent implements OnInit, OnDestroy {

  panierList0: LignePanier[];
  panierList: LignePanier[];
  datasLoaded = false;

  constructor(private cartService: CartService) {
    this.cartService.panierListProvider.subscribe((value: LignePanier[]) => {
      this.panierList = value;
    });
  }

  async ngOnInit(): Promise<void> {
    if (!this.cartService.cartInit){
      this.panierList = await this.cartService.initCartList();
      this.panierList0 = JSON.parse(JSON.stringify(this.panierList));
      this.datasLoaded = true;
    }
    else{
      this.panierList = this.cartService.panierList;
      this.panierList0 = JSON.parse(JSON.stringify(this.panierList));
      this.datasLoaded = true;
    }
  }

  async ngOnDestroy(): Promise<void> {
    await this.cartService.updateCart(this.panierList0);
  }


  increaseQty(element: LignePanier): void {
    if (element.quantite < element.sousarticle.quantite_max) {
      element.quantite += 1;
      this.cartService.updateQty(element, 1);
    }
  }

  decreaseQty(element: LignePanier): void {
    if (element.quantite > 1) {
      element.quantite -= 1;
      this.cartService.updateQty(element, -1);
    }
  }

  async deleteItem(element: LignePanier): Promise<void> {
    await this.cartService.deleteItemCart(element);
    this.panierList = this.cartService.panierList;
  }

}
