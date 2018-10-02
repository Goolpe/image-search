import React, { Component } from 'react';
import FilterBlock from '../FilterBlock';
import {Link} from 'react-router-dom';

class AuthorPage extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div className="container">
      	<Link to="/" className="author_caption">Home</Link>
      	<FilterBlock method="flickr.people.getPhotos" nid={"&user_id=" + this.props.match.params.id}/>
      </div>
    );
  }
}

export default AuthorPage;
