import React, { Component } from 'react';
import moment from 'moment';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=4e223febd1051d6edac11a8ce2f42d36&format=json&nojsoncallback=1';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: [],
			height: 500,
			nextItem: 15,
			loading: false
		}
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll)
// creating array for data fetch
		let photoList = [];

// getting all needed photos
		fetch(API + 'flickr.photos.search' + API_KEY + '&text=dogs')
			.then(response => response.json() )
			.then(data => {

// getting photos info
				data.photos.photo.map(item=>{
					return fetch(API + 'flickr.photos.getInfo' + API_KEY + '&photo_id=' + item.id + '&secret=' + item.secret)
					.then(response=> response.json())
					.then(data => {
						photoList.push(data)
						this.setState({
							photos: photoList
						})
					})
				})
			})
	}
	componentDidUpdate(nextState){
		if(this.state.nextItem !== nextState.nextItem && this.state.nextItem < 100){
		}
	}
	componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e){
		if (window.pageYOffset + window.innerHeight >= this.state.height && this.state.nextItem < 100) {
			this.setState({
				loading: true
			})
			setTimeout(()=>{
				 this.setState({
				 		loading: false,
	        	nextItem: this.state.nextItem + 5,
						height: this.state.height + 500,
	      });
			}, 1500)
     	
	  }
	}
  render() {
  	console.log(this.state.nextItem, this.state.height)
// creating card
  	const photosList = this.state.photos.map((item,index)=> 
        	<div className="card" key={index}>
	        		<img className="card_image" alt={item.photo.title} src={'https://farm' + item.photo.farm + '.staticflickr.com/' + item.photo.server + '/' + item.photo.id + '_' + item.photo.secret + '.jpg'} />
	        		<div className="card_info">
	        			<ul>
	        				<li>{item.photo.owner.username}</li>
	        				<li>{moment(item.photo.dates.taken).format('LL')}</li>
	        				<li>Description: {item.photo.description._content.slice(0,200) || "-"}</li>
	        			</ul>
	        		</div>
        	</div>
        )
    return (
      <div>
				<div className="cards_container">
      		{photosList}
      	</div>
      	{this.state.loading && "loading"}
      </div>
    );
  }
}

export default HomePage;
