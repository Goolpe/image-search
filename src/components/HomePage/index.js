import React, { Component } from 'react';
import moment from 'moment';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=4e223febd1051d6edac11a8ce2f42d36&format=json&nojsoncallback=1';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: []
		}
	}
	componentDidMount(){
// creating array for data fetch
		let photoList = [];

// getting all needed photos
		fetch(API + 'flickr.photos.search' + API_KEY + '&text=dogs')
			.then(response => response.json() )
			.then(data => {

// getting photos info
				data.photos.photo.map(item=>{
					fetch(API + 'flickr.photos.getInfo' + API_KEY + '&photo_id=' + item.id + '&secret=' + item.secret)
					.then(response=> response.json())
					.then(data=> {
						photoList.push(data)
						this.setState({
							photos: photoList
						})
					})
				})
			})
				
	}
  render() {

// creating card
  	const photosList = this.state.photos.map((item,index)=> 
        	<div className="wrapper" key={index}>
        		<div className="card">
	        		<img className="card_image" src={'https://farm' + item.photo.farm + '.staticflickr.com/' + item.photo.server + '/' + item.photo.id + '_' + item.photo.secret + '.jpg'} />
	        		<div className="card_info">
	        			<ul>
	        				<li>{item.photo.owner.username}</li>
	        				<li>{moment(item.photo.dates.taken).format('LL')}</li>
	        				<li>description: {item.photo.description._content.slice(0,200) || "-"}</li>
	        			</ul>
	        		</div>
        		</div>
        	</div>
        )

    return (
      <div>
      	<div className="cards_container">
      		{photosList}
      	</div>
      </div>
    );
  }
}

export default HomePage;
