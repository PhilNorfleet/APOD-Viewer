
import ApodDisplay from './ApodDisplay.js'

import React, { Component } from 'react';
import styled from 'styled-components';
import 'whatwg-fetch';
import Moment from 'moment';

export default class ApodContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: Moment().format('YYYY[-]MM[-]DD'),
      selectedDate: null,
      result: {}
    }
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    this.apodFetch(this.state.today);
  }

  handleDate(date){
    console.log(date)
    let newDate = date
    this.setState({
      selectedDate: newDate
    })
    this.apodFetch(newDate)
  }

  apodFetch(formattedDate){
    let that = this;
    var myInit = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=YP66Ib4qPJavWcNUE1hYTRCBnoOvCZWXXV8BwsIt`, myInit)
    .then(response => response.json())
    .then((responseJSON) => {
      that.setState({
        result: responseJSON
      });
      return responseJSON;
    })
    .catch((error) => {
      alert(error);
    })
  }
  render() {
    console.log(this.state.result)
    return (
      <div>
        <ApodDisplay
          title={this.state.result.title}
          content={this.state.result.explanation}
          url={this.state.result.url}
          hdurl={this.state.result.hdurl}
          media_type={this.state.result.media_type}
          copyright={this.state.result.copyright}
          date={this.state.result.date}
          today={this.state.today}
          onChangeDate={(e) => this.handleDate(e)}>
        </ApodDisplay>
      </div>
    )
  }
}
