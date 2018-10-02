import React, { Component } from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ImageBlock from './ImageBlock';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import Place from '@material-ui/icons/Place';
import moment from 'moment';

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
			viewList: true,
			from: "2000-01-01",
			to: moment().format("YYYY-MM-DD"),
		    size: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleView = this.handleView.bind(this);
		this.handleSize = this.handleSize.bind(this);
	}

	componentDidMount(){
		this.mounted = true;

//getting licenses list
		fetch(API + "flickr.photos.licenses.getInfo" + API_KEY)
			.then(response => response.json() )
			.then(data => {
				if(this.mounted) {
					this.setState({
						licenses: data.licenses.license
					})
				}
			})
			.catch(err => {
		        alert('something broke');
		    });
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

//handling view click
	handleView(){
		this.setState({
			viewGeo: !this.state.viewGeo,
			viewList: !this.state.viewList
		})
	}

	handleSize(e){
		this.setState({
			size: e.target.id
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
				<div className="filter_date_input">
					<span>From: <input type="date" value={this.state.from} min="2000-01-01" max={this.state.to} id="from" onChange={this.handleChange}/></span>
					<span>To: <input type="date" value={this.state.to} max={this.state.to} min={this.state.from} id="to" onChange={this.handleChange}/></span>
				</div>
				<div className="filter_date_input">
					<button onClick={this.handleView} className="filter_icon">{this.state.viewList ? <Place /> : <ViewQuilt />}</button>
					<button onClick={this.handleDate} className="filter_icon">Date{this.state.sortByDateDown ? <ArrowDropUp/> : <ArrowDropDown/>}</button>
				</div>
				<div className="filter_size">
					<button onClick={this.handleSize} id="_n" className={"filter_icon " + (this.state.size === "_n" && "filter_icon_active")}>Small</button>
					<button onClick={this.handleSize} className={"filter_icon " + (this.state.size === "" && "filter_icon_active")}>Medium</button>
					<button onClick={this.handleSize} id="_b" className={"filter_icon " + (this.state.size === "_b" && "filter_icon_active")}>Large</button>
				</div>
	      	</div>
      		<ImageBlock 
      			method={this.props.method} 
      			nid={this.props.nid} 
      			sortByDateUp={this.state.sortByDateUp} 
      			sortByDateDown={this.state.sortByDateDown} 
      			license={this.state.licenseFilter} 
      			viewList={this.state.viewList}
      			from={this.state.from}
      			to={this.state.to}
      			size={this.state.size}
      			/>
      	</React.Fragment>
    );
  }
}

export default FilterBlock;
