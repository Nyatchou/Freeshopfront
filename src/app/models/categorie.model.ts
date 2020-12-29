export class Categorie {
  static PK = 'pk';
  static NOM = 'nom';
  static IMAGE_URL = 'image';
  static SOUS_CATEGORIES = 'souscategories';

  constructor(
    private _id: number,
    private _nom: string,
    private _imageUrl: string,
    private _souscategories: []
  ) {}

  get id(): number {
    return this._id;
  }
  get nom(): string {
    return this._nom;
  }
  get imageUrl(): string {
    return this._imageUrl;
  }
  get souscategories(): [] {
    return this._souscategories;
  }

  public static create_from_responsedata(data): Categorie {
    return new Categorie(
      data[Categorie.PK],
      data[Categorie.NOM],
      data[Categorie.IMAGE_URL],
      data[Categorie.SOUS_CATEGORIES]
    );
  }
}
