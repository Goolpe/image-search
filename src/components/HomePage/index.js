import React, { Component } from 'react';
import moment from 'moment';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=4e223febd1051d6edac11a8ce2f42d36&format=json&nojsoncallback=1';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: [],
			items: 20,
			loading: false
		}
		this.handleScroll = this.handleScroll.bind(this);
		this.loadMoreItems = this.loadMoreItems.bind(this);
	}
	componentDidMount(){

//add event scroll
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

//handling scroll

	handleScroll(e){
		if (document.scrollingElement.scrollTop + document.scrollingElement.clientHeight >= document.scrollingElement.scrollHeight - 20 && this.state.items <= this.state.photos.length){
        this.loadMoreItems();
      }
    }

	loadMoreItems(){
//show loading indicator
			this.setState({
				loading: true
			})

//timeout before load data
			setTimeout(()=>{
				 this.setState({
				 		loading: false,
	        	items: this.state.items + 10,
	      });
			}, 2500)
	}

	componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
	}

  render() {
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
        ).slice(0, this.state.items)
    return (
      <div className="homePage">
				<div ref="iScroll" className="cards_container">
      		{photosList}
      	</div>
      	<div className="loading">
      		{this.state.loading && <h1>loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></h1>}
      	</div>
      </div>
    );
  }
}

export default HomePage;
