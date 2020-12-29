import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  nbItemsInCart: number;
  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartService.itemsNbProvider.subscribe((value: number) => {
      this.nbItemsInCart = value;
    });
  }

  ngOnInit(): void {
    this.nbItemsInCart = this.cartService.itemsNb;
  }

  logout(): void{
    this.authService.logout();
  }

}
