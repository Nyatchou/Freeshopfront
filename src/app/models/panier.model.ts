import { LignePanier } from './ligne-panier.model';

export interface Panier {
  id: string;
  url: string;
  lignespanier: LignePanier[];
  statut: number;
  user: string;
  total: number;
}
