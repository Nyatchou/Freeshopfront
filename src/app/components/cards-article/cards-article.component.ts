import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-cards-article',
  templateUrl: './cards-article.component.html',
  styleUrls: ['./cards-article.component.scss']
})
export class CardsArticleComponent implements OnInit {

  @Input() article: Article;
  
  constructor() { }

  ngOnInit(): void {
  }

}
