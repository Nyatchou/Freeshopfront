import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleExpanded } from 'src/app/models/article-expanded.model';
import { SousArticle } from 'src/app/models/sousarticle.model';
import { CartService } from 'src/app/services/cart.service';
import { DatasFromBackendService } from 'src/app/services/datas-from-backend.service';

@Component({
  selector: 'app-single-article-present',
  templateUrl: './single-article-present.component.html',
  styleUrls: ['./single-article-present.component.scss'],
})
export class SingleArticlePresentComponent implements OnInit {
  id: string;
  articleExpanded: ArticleExpanded;
  sousarticles: SousArticle[];
  sousarticleRep: SousArticle;
  descriptionFontIcon = 'fa-plus';
  datasLoaded = false;

  constructor(
    private datasFromBackendService: DatasFromBackendService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.datasFromBackendService.getSingleArticleDatas(this.id).then((data) => {
      this.articleExpanded = data;
      this.sousarticles = data.sousarticles;
      this.sousarticleRep = this.getRepresenterSousArticle();
      this.datasLoaded = true;
    });
  }

  getRepresenterSousArticle(): SousArticle {
    return this.sousarticles.find(
      (sousArticle: SousArticle) =>
        sousArticle.prix === this.articleExpanded.prix
    );
  }

  private checkEqualityCaractsDicts(
    dict1: { caracteristique: string; valeur: string },
    dict2: { caracteristique: string; valeur: string }
  ): boolean {
    return (
      dict1.caracteristique === dict2.caracteristique &&
      dict1.valeur === dict2.valeur
    );
  }

  getSousArticlesByCaracts(
    caracts: { caracteristique: string; valeur: string }[]
  ): SousArticle[] {
    const sousArticles = this.sousarticles.filter((sousArticle) => {
      const caractsSA = sousArticle.caracteristiques;
      let ind = 0;
      while (
        ind !== caracts.length &&
        this.isCaractContain(caractsSA, caracts[ind])
      ) {
        ind++;
      }
      if (ind === caracts.length) {
        return true;
      }
      return false;
    });
    return sousArticles;
  }

  private isCaractContain(
    container: Array<{ caracteristique: string; valeur: string }>,
    content: { caracteristique: string; valeur: string }
  ): boolean {
    for (const containerElt of container) {
      if (this.checkEqualityCaractsDicts(containerElt, content)) {
        return true;
      }
    }
    return false;
  }

  listValuesFromCaract(caractName: string): string[] {
    const values = new Array();
    this.sousarticles.forEach((sousArticle) => {
      sousArticle.caracteristiques.forEach((caract) => {
        if (
          caract.caracteristique === caractName &&
          !values.includes(caract.valeur)
        ) {
          values.push(caract.valeur);
        }
      });
    });
    return values;
  }

  listCaractsNames(): string[] {
    const caractsNames = new Array();
    const sousart = this.sousarticles[0];
    sousart.caracteristiques.forEach((element) => {
      caractsNames.push(element.caracteristique);
    });
    return caractsNames;
  }

  onclickDescIcon(): void {
    if (this.descriptionFontIcon === 'fa-plus') {
      this.descriptionFontIcon = 'fa-minus';
    } else {
      this.descriptionFontIcon = 'fa-plus';
    }
  }

  changeSousArticle(caract: { name: string; value: string }): void {
    const caractsList = this.sousarticleRep.caracteristiques.copyWithin(0, 0);

    const sousarticles = this.getSousArticlesByCaracts([
      {
        caracteristique: caract.name,
        valeur: caract.value,
      },
    ]);
    this.sousarticleRep = sousarticles[0];

    if (caractsList.length === 1) {
      this.sousarticleRep = sousarticles[0];
      return;
    } else {
      if (!sousarticles.includes(this.sousarticleRep)) {
        const ind = caractsList.findIndex(
          (caractDict) => caractDict.caracteristique === caract.name
        );

        caractsList.splice(ind, 1);

        caractsList.push({
          caracteristique: caract.name,
          valeur: caract.value,
        });

        const sousarticles0 = this.getSousArticlesByCaracts(caractsList);

        if (sousarticles0.length === 0) {
          this.sousarticleRep = sousarticles[0];
        } else {
          this.sousarticleRep = sousarticles0[0];
        }
      }
    }
  }

  addToCart(): void {
    this.cartService.addItemToCart(this.sousarticleRep);
  }
}
