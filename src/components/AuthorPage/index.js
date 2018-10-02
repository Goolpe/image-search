import React from 'react';
import FilterBlock from '../FilterBlock';
import {Link} from 'react-router-dom';

function AuthorPage(props) {
  return (
    <div className="container">
    	<Link to="/" className="author_caption">Home</Link>
    	<FilterBlock method="flickr.people.getPhotos" nid={"&user_id=" + props.match.params.id}/>
    </div>
  );
}

export default AuthorPage;
