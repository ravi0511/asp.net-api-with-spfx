import * as React from 'react';
import styles from './NewsList.module.scss';
import { INewsListProps } from './INewsListProps';
import { INewsListState } from './INewsListState';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClientResponse, IHttpClientOptions, HttpClient } from '@microsoft/sp-http';
import { Link } from 'react-router-dom';
import { NewsListItem } from '../../../models/NewsListItem';

import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
// import { createListItems, IExampleItem } from '@uifabric/example-data';
import { useConst } from '@uifabric/react-hooks';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

/**
 * redirectPage
 */

const onRenderCell = (item: NewsListItem, index: number | undefined): JSX.Element => {
  let url: string = '/news/' + item.id;
  var temp = new Date(item.publishDate);
  let _date = temp.getDate() >= 10 ? temp.getDate().toString() : ("0" + temp.getDate().toString());
  let _month = temp.getMonth()+1 >= 10 ? (temp.getMonth()+1).toString() : ("0" + (temp.getMonth()+1).toString());
  let publishDate: string = _date + "/" + _month + "/" + temp.getFullYear().toString();
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
        <Image className={classNames.itemImage} width={50} height={50} imageFit={ImageFit.cover} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.title}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          <div>{ item.preamble }</div>
          <div>{ 'Publish Date: ' + publishDate }</div>
          <div className={styles.author}>{ item.author.fullName }</div>
          <div className={styles.newsTitle}><Link to={ url }>Edit Item</Link></div>
        </div>
        <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
    </div>
  );
};


export default class NewsList extends React.Component<INewsListProps, INewsListState> {

  constructor(props: INewsListProps, state: INewsListState) {
    super(props);

    this.state = {
      loading: true,
      news: [],
      error: "no error",
      displayItems: [],
      originalItems: []
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  public componentWillMount(): void {
    this.loadNews();
  }

  public componentDidMount(): void {
    // this.loadNews();
  }

  public  redirectPage(e) {
    console.log(e);
  }

  public onFilterChanged = (_: any, text: string): void => {
    var filteredValue = this.state.originalItems.filter((itemValue, index)=> {
        return itemValue.title.toLowerCase().indexOf(text.toLowerCase()) >= 0
    })
    this.setState({
      displayItems: filteredValue
    })
    // setItems(this.state.news.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0));
  };

  public render(): React.ReactElement<INewsListProps, any> {
    let originalItems = this.state.originalItems;
    var items, resultCountText;
    if(this.state.news.length > 0){
      items = this.state.displayItems;
      resultCountText =
      items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;
    }


    // const onFilterChanged = (_: any, text: string): void => {
    //   setItems(this.state.news.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0));
    // };

    return (
      // <div className={ styles.newsList }>
      //   <Link to='/news/add'>Publish News</Link>
      //   {this.state.news.filter((newsItem, index) => {
      //     const currentDate = new Date();
      //     const publishDate = new Date(newsItem.publishDate);
      //     const _authorId = '187338bb-129b-4bae-9735-6b11c603246e';
      //     const currentLoggedinUser = this.props.currentUser; // current login user in SP environment
      //     // Since the author ID is hard coded all the values are visible, else only the 
      //     // new item creator/author can view the articles.
      //     return (publishDate <= currentDate) || (_authorId == newsItem.author.id)
      //   })
      //   .map((newsItem, index)=>{
      //       let url: string = '/news/' + newsItem.id;
      //       var temp = new Date(newsItem.publishDate);
      //       let _date = temp.getDate() >= 10 ? temp.getDate().toString() : ("0" + temp.getDate().toString());
      //       let _month = temp.getMonth()+1 >= 10 ? (temp.getMonth()+1).toString() : ("0" + (temp.getMonth()+1).toString());
      //       let publishDate: string = _date + "/" + _month + "/" + temp.getFullYear().toString();
      //               return <div key={index} className={styles.newsItem}>
      //                 <div className={styles.newsTitle}><Link to={ url }>{ newsItem.title }</Link></div>
      //                 <div>{ newsItem.preamble }</div>
      //                 <div>{ 'Publish Date: ' + publishDate }</div>
      //                 <div className={styles.author}>{ newsItem.author.fullName }</div>
      //                 </div>;
      //             })}
      // </div>

      <FocusZone direction={FocusZoneDirection.vertical}>
      <Link to='/news/add'>Publish News</Link>
      <Link to='/user'>Employee Details</Link>
      <TextField
        label={'Filter by name' + resultCountText}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={this.onFilterChanged}
      />
      <List items={items} onRenderCell={onRenderCell} />
    </FocusZone>
    );
  }

  private loadNews(): void {
    const httpClientOptions: IHttpClientOptions = { 
      headers: { 
        'Accept': 'application/json'
      }
    };
    
    this.props.httpClient.get('http://localhost:5000/api/news/', HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<NewsListItem[]> => {
        return response.json();
    }).then((news: NewsListItem[]): void => {
      console.log('news', news);
      this.setState((prevState:INewsListState, props: INewsListProps): INewsListState => {
        prevState.loading = false;
        prevState.news = news;
        prevState.displayItems = news.filter((newsItem, index) => {
              const currentDate = new Date();
              const publishDate = new Date(newsItem.publishDate);
              const _authorId = '187338bb-129b-4bae-9735-6b11c603246e';
              const currentLoggedinUser = this.props.currentUser; // current login user in SP environment
              // Since the author ID is hard coded all the values are visible, else only the 
              // new item creator/author can view the articles.
              return (publishDate <= currentDate) || (_authorId == newsItem.author.id)
        });
        prevState.originalItems = news.filter((newsItem, index) => {
              const currentDate = new Date();
              const publishDate = new Date(newsItem.publishDate);
              const _authorId = '187338bb-129b-4bae-9735-6b11c603246e';
              const currentLoggedinUser = this.props.currentUser; // current login user in SP environment
              // Since the author ID is hard coded all the values are visible, else only the 
              // new item creator/author can view the articles.
              return (publishDate <= currentDate) || (_authorId == newsItem.author.id)
        });
        return prevState;
      });
    }, (error: any): void => {
      this.setState((prevState:INewsListState, props: INewsListProps): INewsListState => {
        prevState.loading = false;
        prevState.error = error;
        return prevState;
      });
    });
  }
}
