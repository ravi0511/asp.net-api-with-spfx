import { NewsListItem } from '../../../models/NewsListItem';

export interface INewsListState {
    loading: boolean;
    news: NewsListItem[];
    error: string;
    displayItems: NewsListItem[];
    originalItems: NewsListItem[];
}
