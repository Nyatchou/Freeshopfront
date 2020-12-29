import { HOST_URL } from '../../app/commons/url_backend';

export class Article {
  static ID = 'pk';
  static NOM = 'nom';
  static IMAGE_URL = 'image_present';
  static PRIX = 'prix_present';
  static PREV_PRIX = 'prev_prix_present';

  private _id: number;
  private _nom: string;
  private _imageUrl: string;
  private _prix: number;
  private _prevPrix: number;

  constructor(
    id: number,
    nom: string,
    imageUrl: string,
    prix: number,
    prevPrix: number
  ) {
    this._id = id;
    this._nom = nom;
    this._imageUrl = imageUrl;
    this._prix = prix;
    this._prevPrix = prevPrix;
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

  public static create_from_responsedata(data): Article {
    const str: string = data[Article.IMAGE_URL];
    if (str.includes('http', 0)) {
      return new Article(
        data[Article.ID],
        data[Article.NOM],
        data[Article.IMAGE_URL],
        data[Article.PRIX],
        data[Article.PREV_PRIX]
      );
    } else {
      return new Article(
        data[Article.ID],
        data[Article.NOM],
        HOST_URL + data[Article.IMAGE_URL],
        data[Article.PRIX],
        data[Article.PREV_PRIX]
      );
    }
  }
}
