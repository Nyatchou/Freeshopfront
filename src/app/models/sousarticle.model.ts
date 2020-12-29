export class SousArticle {
  static PK = 'pk';
  static PRIX = 'prix';
  static PREV_PRIX = 'prev_prix';
  static CARACTERISTIQUES = 'caracteristiques';
  static QUANTITE = 'quantite';
  static CARACT_NAME_LABEL = 'caracteristique';
  static CARACT_VALUE_LABEL = 'valeur';

  private _pk: string;
  private _quantite: number;
  private _prix: number;
  private _prevPrix: number;
  private _caracteristiques: Array<{ caracteristique: string; valeur: string }>;

  constructor(
    pk: string,
    prix: number,
    prevPrix: number,
    caracteristiques: Array<{ caracteristique: string; valeur: string }>,
    quantite?: number
  ) {
    this._pk = pk;
    this._prix = prix;
    this._prevPrix = prevPrix;
    this._caracteristiques = caracteristiques;
    this._quantite = quantite;
  }

  get pk(): string {
    return this._pk;
  }
  get quantite(): number {
    return this._quantite;
  }
  get prix(): number {
    return this._prix;
  }
  get prevPrix(): number {
    return this._prevPrix;
  }
  get caracteristiques(): Array<{ caracteristique: string; valeur: string }> {
    return this._caracteristiques;
  }

  public static create_from_responsedata(data): SousArticle {
    if (data[SousArticle.QUANTITE] === undefined) {
      return new SousArticle(
        data[SousArticle.PK],
        data[SousArticle.PRIX],
        data[SousArticle.PREV_PRIX],
        data[SousArticle.CARACTERISTIQUES]
      );
    }
    return new SousArticle(
      data[SousArticle.PK],
      data[SousArticle.PRIX],
      data[SousArticle.PREV_PRIX],
      data[SousArticle.CARACTERISTIQUES],
      data[SousArticle.QUANTITE]
    );
  }
}
