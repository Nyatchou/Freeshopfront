import { Article } from './article.model';

export interface ArticleListResponse {
  count: number;
  articleslist: Article[];
}
