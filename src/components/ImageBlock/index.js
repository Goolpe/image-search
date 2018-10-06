import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './imageBlock.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPhotos } from '../actions/photoActions';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1';

class ImageBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			photos: this.props.photos,
			error: "",
			items: 30,
			loading: false,
		}
		this.handleScroll = this.handleScroll.bind(this);
		this.loadMoreItems = this.loadMoreItems.bind(this);
	}

	componentDidMount(){
//add event scroll
		window.addEventListener('scroll', this.handleScroll);
		this.props.fetchPhotos(this.props.request);
	}

	componentDidUpdate(nextProps){
		if(this.props.request !== nextProps.request){
			this.props.fetchPhotos(this.props.request);
		}	
	}

//handling scroll

	handleScroll(e){
		let elem = document.scrollingElement
		if (elem.scrollTop + elem.clientHeight >= elem.scrollHeight - 20 && this.state.items <= this.props.photos.length){
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
	  // this.mounted = false;
	}
  render() {
  	console.log(this.props.photos)
// sort by date down

	let photosWithFilter = this.props.photos.sort((a,b) =>{
		return new Date(b.photo.dates.taken) - new Date(a.photo.dates.taken)
	})

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
		<figure className={"card " + (this.props.size === "_n" ? "card--size-small" : this.props.size === "_b" ? "card--size-large" : "card--size-medium")} key={index}>
			<img className="card__image" alt={item.photo.title} src={'https://farm' + item.photo.farm + '.staticflickr.com/' + item.photo.server + '/' + item.photo.id + '_' + item.photo.secret + this.props.size + '.jpg'} />
			<figcaption className="card__caption">
				<div className="card__author-date">
					<Link className="card__author" to={`/author/${item.photo.owner.nsid}`}>{item.photo.owner.username}</Link>
					<time className="card__date">{moment(item.photo.dates.taken).format('LL')}</time>
				</div>
				<div className="card__description">{item.photo.description._content.slice(0,60) || "-"}</div>
			</figcaption>
		</figure>
	).slice(0, this.state.items)

	return (
		<React.Fragment>
			{this.state.error ? <div className="image-block">
					 {this.state.error}
		  </div>
		  :
		  <div className="image-block image-block--cards">
				{PHOTOS_LIST}
			</div>
			}
			{this.state.loading && <div className="image-block">		 
				<h1>loading
					<span className="image-block__preload-dot">.</span>
					<span className="image-block__preload-dot">.</span>
					<span className="image-block__preload-dot">.</span>
				</h1>
		  </div>}
		</React.Fragment>
	);
  }
}

ImageBlock.propTypes = {
  fetchPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  photos: state.photos.items
})

export default connect(mapStateToProps, { fetchPhotos })(ImageBlock);
