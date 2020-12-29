import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  typeLiv: string;
  totalPanier: number;
  constructor(private cartService: CartService) {
    this.cartService.totalPanierProvider.subscribe((totalP) => {
      this.totalPanier = totalP;
    });
  }

  ngOnInit(): void {
    this.totalPanier = this.cartService.totalPanier;
  }

  changeTypeLiv(event: Event): void{
    this.typeLiv = (event.target as HTMLInputElement).id;
  }

}
