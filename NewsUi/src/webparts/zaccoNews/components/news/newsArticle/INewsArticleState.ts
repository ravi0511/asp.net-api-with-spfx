import { NewsArticleItem } from '../../../models/NewsArticleItem';
export interface INewsArticleState {
    loading: boolean;
    news: NewsArticleItem;
    error: string;
}
