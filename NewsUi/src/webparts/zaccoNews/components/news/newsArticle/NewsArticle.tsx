import * as React from 'react';
import styles from './NewsArticle.module.scss';
import { INewsArticleProps } from './INewsArticleProps';
import { INewsArticleState } from './INewsArticleState';
import { escape } from '@microsoft/sp-lodash-subset';
import { withRouter } from 'react-router-dom' ;
import { HttpClientResponse, IHttpClientOptions, HttpClient } from '@microsoft/sp-http';
import { Link } from 'react-router-dom';
import { NewsArticleItem } from '../../../models/NewsArticleItem';

class NewsArticle extends React.Component<INewsArticleProps, INewsArticleState> {

  constructor(props: INewsArticleProps, state: INewsArticleState) {
    super(props);

    this.state = {
      loading: true,
      news: null,
      error: null
    };
  }

  public componentDidMount(): void {
    console.log('componentDidMount',this.props.match.params);
    this.loadNews();
  }

  public publishDateValue(value: string) : string{
    var temp = new Date(this.state.news.publishDate);
    let _date = temp.getDate() >= 10 ? temp.getDate().toString() : ("0" + temp.getDate().toString());
    let _month = temp.getMonth()+1 >= 10 ? (temp.getMonth()+1).toString() : ("0" + (temp.getMonth()+1).toString());
    let publishDate: string = _date + "/" + _month + "/" + temp.getFullYear().toString();
    return publishDate;
  }

  public render(): React.ReactElement<INewsArticleProps> {
    return (
      <div className={ styles.newsArticle }>
        <Link to='/'>Back to News List</Link>
        {this.state.news != null && 
          <div className={styles.newsItem}>
            <div className={styles.newsTitle}>{escape(this.state.news.title)}</div>
            <div className={styles.preamble}>{escape(this.state.news.preamble)}</div>
            <div className={styles.article}><pre>{escape(this.state.news.article)}</pre></div>
            <div className={styles.article}><pre>{escape(this.publishDateValue(this.state.news.publishDate))}</pre></div>
            <div className={styles.author}>{escape(this.state.news.author.fullName)}</div>
          </div>
        }
      </div>
    );
  }

  private loadNews(): void {
    const httpClientOptions: IHttpClientOptions = { 
      headers: { 
        'Accept': 'application/json'
      }
    };
    
    this.props.httpClient.get('http://localhost:5000/api/news/' + this.props.match.params.id, HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<NewsArticleItem> => {
        return response.json();
    }).then((news: NewsArticleItem): void => {
      this.setState((prevState:INewsArticleState, props: INewsArticleProps): INewsArticleState => {
        prevState.loading = false;
        prevState.news = news;
        return prevState;
      });
    }, (error: any): void => {
      this.setState((prevState:INewsArticleState, props: INewsArticleProps): INewsArticleState => {
        prevState.loading = false;
        prevState.error = error;
        return prevState;
      });
    });
  }

}

export default withRouter(NewsArticle);