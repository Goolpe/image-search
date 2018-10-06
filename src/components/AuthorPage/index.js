import React from 'react';
import ImageBlock from '../ImageBlock';
import {Link} from 'react-router-dom';

function AuthorPage(props) {
  return (
    <main className="main">
    	<Link to="/" className="author_link">Home</Link>
    	<ImageBlock method="flickr.people.getPhotos&user_id=" nid={props.match.params.id}/>
    </main>
  );
}

export default AuthorPage;
