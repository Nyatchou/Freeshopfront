import { SousArticle } from './sousarticle.model';
import { HOST_URL } from '../../app/commons/url_backend';

export class ArticleExpanded {
  static ID = 'id';
  static NOM = 'nom';
  static IMAGE_URL = 'image_present';
  static PRIX = 'prix_present';
  static PREV_PRIX = 'prev_prix_present';
  static DESCRIPTION = 'description';
  static SOUS_ARTICLES = 'sousarticles';

  private _id: number;
  private _nom: string;
  private _imageUrl: string;
  private _prix: number;
  private _prevPrix: number;
  private _description: string;
  private _sousarticles: SousArticle[];

  constructor(
    id: number,
    nom: string,
    imageUrl: string,
    prix: number,
    prevPrix: number,
    description: string,
    sousarticles: SousArticle[]
  ) {
    this._id = id;
    this._nom = nom;
    this._imageUrl = imageUrl;
    this._prix = prix;
    this._prevPrix = prevPrix;
    this._description = description;
    this._sousarticles = sousarticles;
  }

  get id(): number {
    return this._id;
  }

  get nom(): string {
    return this._nom;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get prix(): number {
    return this._prix;
  }

  get prevPrix(): number {
    return this._prevPrix;
  }

  get description(): string {
    return this._description;
  }

  get sousarticles(): SousArticle[] {
    return this._sousarticles;
  }

  public static create_from_responsedata(data): ArticleExpanded {
    const sousarticls = new Array<SousArticle>();
    data[ArticleExpanded.SOUS_ARTICLES].forEach((data) => {
      sousarticls.push(SousArticle.create_from_responsedata(data));
    });
    return new ArticleExpanded(
      data[ArticleExpanded.ID],
      data[ArticleExpanded.NOM],
      HOST_URL + data[ArticleExpanded.IMAGE_URL],
      data[ArticleExpanded.PRIX],
      data[ArticleExpanded.PREV_PRIX],
      data[ArticleExpanded.DESCRIPTION],
      sousarticls
    );
  }
}
