import React, { Component } from 'react';
import styled from 'styled-components';
import ApodImage from './ApodImage.js'

// haven't used styled-components before, and I am not entirely sure this is the proper design pattern.
const InfoBox = styled.div`
  float: right;
  width: 30%;
  height: 100vh;
`;
const BlackText = styled.p`
  font-family: "Hoefler Text";
  color: #000000
`;
const ImageDate = styled(BlackText)`
  text-align: center;
  font-size: 20px;
`;
const Title = styled(BlackText)`
  text-align: center;
  font-size: 32px;
`;
const Description = styled(BlackText)`
  text-align: center;
  font-size: 16px;
`;
const Copyright = styled(BlackText)`
  font-size: 12px;
`;
const ControlBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export default class ApodDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 700,
      displayDate: this.props.today
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {

    document.getElementById('widthInput').value = this.state.imageWidth;
  }

  handleDateChange(e) {
    // debugger
    var date = e.target.value;
    this.setState({
      displayDate: date
    })
    return date.length ? this.props.onChangeDate(date) : null;
  }

  handleResize(e) {
    if (e.target.value < 200) {
      alert ('minimum is 200px');
      return null;
    }
    if (e.target.value > 2400) {
      alert('maximum is 2400px');
      return null;
    }
    this.setState({
      imageWidth : e.target.value
    })
    document.getElementById('widthInput').value = e.target.value;
    //doing it this way because updating every keystroke is weird and I don't want to guess at when you are done typing
    // therefore I use onBlur event to change input field, but using value tag on the element does not allow you to change it
    //otherwise I would use the state to set the value on the input field in the actual element.
    // setState is asynchronous so I can't use it to set the input value here either.
  }

  render() {
    return (
      <div>
        <InfoBox>
          <Title> {this.props.title}</Title>
          <ImageDate>{this.props.date}</ImageDate>
          <Description> {this.props.content}</Description>
          <Copyright> Image copyright: {this.props.copyright}</Copyright>
        </InfoBox>
        <ControlBox>
          <input type='date' ref='datepicker' value={this.state.displayDate} max={this.props.today} onChange={(e) => this.handleDateChange(e)}/>
          <input type='range' value={this.state.imageWidth} min="200" max="2400" step="100" onChange={(e => this.handleResize(e))}/>
          <input type='number' min="200" max="2400" id='widthInput' onBlur={(e => this.handleResize(e))}/>px
        </ControlBox>

        <ApodImage
          url={this.props.url}
          hdurl={this.props.hdurl}
          width={this.state.imageWidth}
        />

      </div>
    );
  }
}
