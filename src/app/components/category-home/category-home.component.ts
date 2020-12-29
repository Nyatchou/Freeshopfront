import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SousCategorie } from 'src/app/models/souscategorie.model';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss']
})
export class CategoryHomeComponent implements OnInit {

  @Input() id: number;
  @Input() nom: string;
  @Input() imageUrl: string;
  @Input() souscategories: SousCategorie[];

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {

  }

  goToShop(): void{
    this.shopService.currentSubCategorySubject.next({souscategorie: this.souscategories[0].nom, categorie: this.nom});
    this.shopService.currentSubCategoryIdSubject.next(this.souscategories[0].pk);
    this.router.navigate(['/shop']);
  }


}
