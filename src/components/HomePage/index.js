import React, { Component } from 'react';
import ImageBlock from '../ImageBlock';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Sort from '@material-ui/icons/Sort';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=501cd1f79f31f6d00da6faed96ee96ae&format=json&nojsoncallback=1';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs',
			sortByDateUp: false,
			sortByDateDown: true,
			licenses: [],
			licenseFilter: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		fetch(API + "flickr.photos.licenses.getInfo" + API_KEY)
			.then(response => response.json() )
			.then(data => {
				this.setState({
					licenses: data.licenses.license
				})
			})
	}
//handling change of value input
	handleChange(e){
		let value = e.target.value
		this.setState({
			[e.target.id] : value
		})
	}

//handling submit
	handleSubmit(e){
		e.preventDefault();
		this.setState({
			input: this.state.inputText.toLowerCase()
		})
	}

//handling click on filter
	handleClick(){
		this.setState({
			sortByDateUp: !this.state.sortByDateUp,
			sortByDateDown: !this.state.sortByDateDown
		})
	}
  render() {
  	const LICENSES_LIST = this.state.licenses.map((license,index) => 
  		<option key={index} value={license.id}>{license.name}</option>
  	)
    return (
      <div className="container">
      	<h1>Search photos</h1>
      	<form onSubmit={this.handleSubmit} className="home_search">
	      	<input value={this.state.inputText} id="inputText" onChange={this.handleChange} placeholder="Dogs" required/>
	      	<button type="submit" >Search</button>
      	</form>
      	<div className="filter_container">
      	<button onClick={this.handleClick} className="filter_icons">{this.state.sortByDateDown ? <ArrowDropUp/> : <ArrowDropDown/>}Date</button>
      	<select value={this.state.licenseFilter} id="licenseFilter" onChange={this.handleChange}>
			    {LICENSES_LIST}
			  </select>
      	</div>
      	<ImageBlock method="flickr.photos.search" nid={"&text=" + this.state.input} sortByDateUp={this.state.sortByDateUp} sortByDateDown={this.state.sortByDateDown} license={this.state.licenseFilter}/>
      </div>
    );
  }
}

export default HomePage;
