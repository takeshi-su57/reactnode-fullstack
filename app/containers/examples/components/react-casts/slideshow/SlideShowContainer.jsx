import React, { Component } from 'react';
import SlideShow from './SlideShow';

class SlideShowContainer extends Component {
  render() {
    return (
      <SlideShow>
        <img src="http://placekitten.com/300/201" alt="Cat Pic" />
        <img src="http://placekitten.com/300/202" alt="Cat Pic" />
        <img src="http://placekitten.com/300/203" alt="Cat Pic" />
      </SlideShow>
    );
  }
}

export default SlideShowContainer;
