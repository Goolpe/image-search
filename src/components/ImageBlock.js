import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=501cd1f79f31f6d00da6faed96ee96ae&format=json&nojsoncallback=1';

class ImageBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: [],
			items: 20,
			loading: false
		}
		this.handleScroll = this.handleScroll.bind(this);
		this.loadMoreItems = this.loadMoreItems.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount(){
//add event scroll
		window.addEventListener('scroll', this.handleScroll);
		this.fetchData();
	}

	fetchData(){
		this.setState({
				loading: true
			})
// creating array for data fetch
		let photoList = [];
		
// getting photos
		fetch(API + this.props.method + API_KEY + this.props.nid)
			.then(response => response.json() )
			.then(data => {
// getting photos info
				data.photos.photo.map(item=>{
					return fetch(API + 'flickr.photos.getInfo' + API_KEY + '&photo_id=' + item.id + '&secret=' + item.secret)
					.then(response=> response.json())
					.then(data => {
						photoList.push(data)
						this.setState({
							photos: photoList,
							loading: false
						})
					})
				})
			})
	}

	componentDidUpdate(nextProps){
		if (this.props.nid !== nextProps.nid){
			this.fetchData()
		}
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

  render() {
  	var photosWithFilter;

// sort by date down

  	this.props.sortByDateDown && (photosWithFilter = this.state.photos.sort((a,b) =>{
  		return new Date(b.photo.dates.taken) - new Date(a.photo.dates.taken)
  	}))

// sort by date up

  	this.props.sortByDateUp && (photosWithFilter = this.state.photos.sort((a,b) =>{
  		return new Date(a.photo.dates.taken) - new Date(b.photo.dates.taken)
  	}))

// licenses filter

  	this.props.license && (photosWithFilter = photosWithFilter.filter(item => this.props.license === item.photo.license))
  	console.log(photosWithFilter)
// creating cards
  	const PHOTOS_LIST = photosWithFilter.map((item,index)=> 
        	<div className="card" key={index}>
	        		<img className="card_image" alt={item.photo.title} src={'https://farm' + item.photo.farm + '.staticflickr.com/' + item.photo.server + '/' + item.photo.id + '_' + item.photo.secret + '.jpg'} />
	        		<div className="card_info">
	        			<div className="card_info_author_date">
	        				<Link className="author_link" to={`/author/${item.photo.owner.nsid}`}>{item.photo.owner.username}</Link>
	        				{moment(item.photo.dates.taken).format('LL')}
	        			</div>
	        			<div className="card_info_description">{item.photo.description._content.slice(0,200) || "-"}</div>
	        		</div>
        	</div>
        ).slice(0, this.state.items)
    return (
      <div className="container">
		<div className="cards_container">
      		{PHOTOS_LIST}
      	</div>
      	<div className="loading">
      		{this.state.loading && <h1>loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></h1>}
      	</div>
      </div>
    );
  }
}

export default ImageBlock;
