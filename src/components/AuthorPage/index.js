import React, { Component } from 'react';
import ImageBlock from '../ImageBlock';

class AuthorPage extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div>
      	<ImageBlock method="flickr.people.getPhotos" nid={"&user_id=" + this.props.match.params.id}/>
      </div>
    );
  }
}

export default AuthorPage;
