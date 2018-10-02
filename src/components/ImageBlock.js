import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=210faf4ab82b8d0fdd0e13dc09080003&format=json&nojsoncallback=1';

const AnyReactComponent = ({ text }) => (<div> {text}</div>);

class ImageBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: [],
			items: 30,
			loading: false,
			geolist: [],
			center: {
		      lat: 59.95,
		      lng: 30.33
		    },
		    zoom: 11
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

	componentDidUpdate(nextProps){
		if(this.props.nid !== nextProps.nid){
			this.fetchData();
		}	
	}

	fetchData(){
		this.setState({
				loading: true
			})
		this.mounted = true;
// creating arrays for data fetch
		let photoList = [];
		let geoList = [];
		
// getting photos
		
		fetch(API + this.props.method + API_KEY + this.props.nid)
			.then(response => response.json() )
			.then(data => {
// getting photos info
				if(this.mounted) {
					data.photos.photo.map(item =>{
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

					data.photos.photo.map(item =>{
						return fetch(API + 'flickr.photos.geo.getLocation' + API_KEY + '&photo_id=' + item.id)
						.then(response=> response.json())
						.then(data => {
							if(data.stat === "ok"){
								geoList.push(data)
								this.setState({
									geolist: geoList
								})
							}
						})
						
					})
				}
			})
			.catch(err => {
			        alert('something broke');
			    });
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

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	  	this.mounted = false;
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

// date sort from
	this.props.from && (photosWithFilter = photosWithFilter.filter(item => 
	    Date.parse(item.photo.dates.taken) >= Date.parse(this.props.from)))

// date sort to
	this.props.to && (photosWithFilter = photosWithFilter.filter(item => 
	    Date.parse(item.photo.dates.taken) < (Date.parse(this.props.to))))

// creating cards
  	const PHOTOS_LIST = photosWithFilter.map((item,index)=> 
        	<div className={"card " + (this.props.size === "_n" ? "card_small" : this.props.size === "_b" ? "card_large" : "card_medium")} key={index}>
	        		<img className="card_image" alt={item.photo.title} src={'https://farm' + item.photo.farm + '.staticflickr.com/' + item.photo.server + '/' + item.photo.id + '_' + item.photo.secret + this.props.size + '.jpg'} />
	        		<div className="card_info">
	        			<div className="card_info_author_date">
	        				<Link className="author_link" to={`/author/${item.photo.owner.nsid}`}>{item.photo.owner.username}</Link>
	        				{moment(item.photo.dates.taken).format('LL')}
	        			</div>
	        			<div className="card_info_description">{item.photo.description._content.slice(0,60) || "-"}</div>
	        		</div>
        	</div>
        ).slice(0, this.state.items)

//locations on the google map
  	const GEO_LIST = this.state.geolist.map((item,index)=>
  		<AnyReactComponent key={index} lat={item.photo.latitude} lng={item.photo.longitude}	text={item.photo.location.locality._content}	/>
  	)
    return (
    	<React.Fragment>
			{this.props.viewList ? 
				<React.Fragment>
					<div className="cards_container">
			      		{PHOTOS_LIST}
			      	</div> 
			      	<div className="loading">
			      		{this.state.loading && <h1>loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></h1>}
			      	</div>
		      	</React.Fragment>
	      	:
	      		<div className="cards_container">
	      			<div style={{ height: '100vh', width: '100%' }}>
			      		<GoogleMapReact
					          bootstrapURLKeys={{ key: "AIzaSyBdyft2ywxg0IbrE6MxSfiPO_Boywlz1ao" }}
					          defaultCenter={this.state.center}
					          defaultZoom={this.state.zoom}
					        >
					          {GEO_LIST}
					    </GoogleMapReact>
				    </div>
		      	</div>
	      	}
	      	
      	</React.Fragment>
    );
  }
}

export default ImageBlock;
