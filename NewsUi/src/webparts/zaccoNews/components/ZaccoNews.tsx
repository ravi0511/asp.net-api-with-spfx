import * as React from 'react';
import styles from './ZaccoNews.module.scss';
import { IZaccoNewsProps } from './IZaccoNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import NewsList from './news/newsList/NewsList';
import NewsArticle from './news/newsArticle/NewsArticle';
import PublishNews from './news/publishNews/PublishNews';
import EmployeeDetails from './news/employeeDetails/EmployeeDetails';

import { HashRouter, Route, Switch } from 'react-router-dom';

export default class ZaccoNews extends React.Component<IZaccoNewsProps, {}> {
  public render(): React.ReactElement<IZaccoNewsProps> {
    return (
      <div className={ styles.zaccoNews }>
        <HashRouter >
          <Switch>
            <Route exact path="/" component={(comp) => <NewsList httpClient={this.props.httpClient} currentUser={this.props.currentUser} />} />
            <Route path="/news/add" component={(comp) => <PublishNews httpClient={this.props.httpClient} />}  />
            <Route path="/news/:id" component={(comp) => <NewsArticle httpClient={this.props.httpClient} />}  />
            <Route path="/user" component={(comp) => <EmployeeDetails httpClient={this.props.httpClient} />}  />
          </Switch>  
        </HashRouter>
      </div>
    );
  }
}
