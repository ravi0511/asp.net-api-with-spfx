import * as React from 'react';
import DatePicker from "react-datepicker";
import styles from './PublishNews.module.scss';
import "react-datepicker/dist/react-datepicker.css";
import { IPublishNewsProps } from './IPublishNewsProps';
import { IPublishNewsState } from './IPublishNewsState';
import { escape } from '@microsoft/sp-lodash-subset';
import { withRouter } from 'react-router-dom' ;
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { HttpClientResponse, IHttpClientOptions, HttpClient } from '@microsoft/sp-http';

class PublishNews extends React.Component<IPublishNewsProps, IPublishNewsState> {
  constructor(props){
    super(props);
    this.state = {
      startDate: new Date(),
      errorMessage: '',
      titleValue: '',
      preambleValue: ''
    };
  }
  // private titleValue: string;
  // private preambleValue: string;
  private articleValue: string;

  public setTitle(title: string): void
  {
    this.setState({
      titleValue: title
    });
  }

  public setPublish(_publishDate: Date): void
  {
    this.setState({
      startDate : _publishDate
    });
  }

  public setPreamble(preamble: string): void
  {
    this.setState({
      preambleValue: preamble
    })
  }

  public setArticle(article: string): void
  {
    this.articleValue = article;
  }

  public publishNews(): void {
    if(this.state.titleValue.length > 0 && this.state.preambleValue.length > 0){
      this.setState({
        errorMessage : ''
      });
      let newArticle = {
        title: this.state.titleValue,
        preamble: this.state.preambleValue,
        article: this.articleValue,
        publishDate: this.state.startDate,
        authorId: '187338bb-129b-4bae-9735-6b11c603246e'
      };
  
      const httpClientOptions: IHttpClientOptions = { 
        headers: { 
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newArticle)
      };
      
      this.props.httpClient.post('http://localhost:5000/api/news/', HttpClient.configurations.v1, httpClientOptions)
      .then((response: HttpClientResponse): void => {
        this.props.history.push('/');
      });
    } 
    else {
      this.setState({
        errorMessage : 'Please enter the value for required fields.'
      });
    }
  }

  public render(): React.ReactElement<IPublishNewsProps, any> {
    return (
      <div className={ styles.publishNews }>
        {/* <div><label text="Please enter all the required values" color="red"></label></div> */}
        <div><TextField errorMessage={ this.state.titleValue.length <= 0 ? this.state.errorMessage : ""} required={true} label='Title' onChanged={this.setTitle.bind(this)} /></div>
        <div><TextField errorMessage={ this.state.preambleValue.length <= 0 ? this.state.errorMessage : ""} required={true} label='Preamble' onChanged={this.setPreamble.bind(this)} multiline rows={ 4 } /></div>
        <div><TextField label='Article' onChanged={this.setArticle.bind(this)} multiline rows={ 15 } /></div>
        <div><DatePicker label='Publish Date' selected={this.state.startDate} onSelect={this.setPublish.bind(this)} /></div>
        <div><PrimaryButton
            primary={ true }
            data-automation-id='test'
            text='Publish'
            // disabled={this.state.titleValue.length < 0 || this.state.preambleValue.length < 0}
            onClick={ this.publishNews.bind(this) }
          /></div>
      </div>
    );
  }
}

export default withRouter(PublishNews);