import React, { Component } from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ImageBlock from './ImageBlock';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import Place from '@material-ui/icons/Place';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=210faf4ab82b8d0fdd0e13dc09080003&format=json&nojsoncallback=1';

class FilterBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs',
			sortByDateUp: false,
			sortByDateDown: true,
			licenses: [],
			licenseFilter: "",
			viewGeo: false,
			viewList: true
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleView = this.handleView.bind(this);
	}

	componentDidMount(){
		this.mounted = true;

		fetch(API + "flickr.photos.licenses.getInfo" + API_KEY)
			.then(response => response.json() )
			.then(data => {
				if(this.mounted) {
					this.setState({
						licenses: data.licenses.license
					})
				}
			})
	}
//handling change of value input
	handleChange(e){
		let value = e.target.value
		this.setState({
			[e.target.id] : value
		})
	}

//handling click on filter
	handleDate(){
		this.setState({
			sortByDateUp: !this.state.sortByDateUp,
			sortByDateDown: !this.state.sortByDateDown
		})
	}

	handleView(){
		this.setState({
			viewGeo: !this.state.viewGeo,
			viewList: !this.state.viewList
		})
	}

	componentWillUnmount(){
	  this.mounted = false;
	}
  render() {
  	const LICENSES_LIST = this.state.licenses.map((license,index) => 
  		<option key={index} value={license.id}>{license.name}</option>
  	)
    return (
    	<React.Fragment>
	      	<div className="filter_container">
	      		<select value={this.state.licenseFilter} id="licenseFilter" onChange={this.handleChange}>
	      			<option value="">All</option>
				    {LICENSES_LIST}
				</select>
				<button onClick={this.handleDate} className="filter_icon">Date{this.state.sortByDateDown ? <ArrowDropUp/> : <ArrowDropDown/>}</button>
				<button onClick={this.handleView} className="filter_icon">{this.state.viewList ? <Place /> : <ViewQuilt />}</button>
	      	</div>
      		<ImageBlock method={this.props.method} method2={this.props.method2} nid={this.props.nid} sortByDateUp={this.state.sortByDateUp} sortByDateDown={this.state.sortByDateDown} license={this.state.licenseFilter} geolist={this.state.viewGeo} viewList={this.state.viewList}/>
      	</React.Fragment>
    );
  }
}

export default FilterBlock;
