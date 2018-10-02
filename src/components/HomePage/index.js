import React, { Component } from 'react';
import ImageBlock from '../ImageBlock';

class HomePage extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div className="homePage">
      	<ImageBlock method="flickr.photos.search" nid={"&text=dogs"}/>
      </div>
    );
  }
}

export default HomePage;
