interface SousArticleI {
  id: string;
  nom: string;
  image_url: string;
  quantite_max: number;
}

export interface LignePanier {
  id: string;
  sousarticle: SousArticleI;
  quantite: number;
  prixunitaire: number;
}
