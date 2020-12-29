import { Article } from './article.model';

export class CategHome {
  static NOM = 'nom';
  static ARTICLES_HOME = 'articlestohome';

  private _nom: string;
  private _articlestohome: Array<Article>;

  constructor(nom: string, articlestohome: Array<Article>) {
    this._nom = nom;
    this._articlestohome = articlestohome;
  }

  get nom(): string {
    return this._nom;
  }
  get articlestohome(): Article[] {
    return this._articlestohome;
  }
  public static create_from_responsedata(data): CategHome {
    const articleslist = new Array<Article>();
    data[CategHome.ARTICLES_HOME].forEach((articlehome) => {
      articleslist.push(
        Article.create_from_responsedata(articlehome['article'])
      );
    });
    return new CategHome(data[CategHome.NOM], articleslist);
  }
}
