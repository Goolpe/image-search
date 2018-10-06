import React from 'react';
import FilterBlock from '../FilterBlock';
import {Link} from 'react-router-dom';

function AuthorPage(props) {
  return (
    <main className="main">
    	<Link to="/" className="author_link">Home</Link>
    	<FilterBlock method="flickr.people.getPhotos" nid={"&user_id=" + props.match.params.id}/>
    </main>
  );
}

export default AuthorPage;
