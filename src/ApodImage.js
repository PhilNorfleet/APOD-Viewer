import React, { Component } from 'react';
import styled from 'styled-components';
import DragScroll from 'react-dragscroll'
const Container = styled(DragScroll)`
  text-align: center;
  float: left;
  overflow: scroll;
  max-width: 70%;
  max-height: 90vh;
`;

export default class ApodDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <Container>
        <img display="block" width={this.props.width} src={this.props.width > 1000 ? this.props.hdurl : this.props.url}></img>
      </Container>
    );
  }
}
