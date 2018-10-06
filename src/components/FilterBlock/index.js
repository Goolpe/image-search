import React, { Component } from 'react';
import ImageBlock from '../ImageBlock';
import moment from 'moment';
import './filterBlock.css';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1';

class FilterBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs',
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
	      	<details className="filter">
	      		<summary className="filter__summary">Advanced</summary>
	      		<div className="filter__block">
	      			<div className="filter__wrapper">
			      		<select value={this.state.licenseFilter} className="filter__elem filter__elem--select" id="licenseFilter" onChange={this.handleChange}>
			      			<option value="">All</option>
						    	{LICENSES_LIST}
								</select>
							</div>
							<div className="filter__wrapper">
								<label className="filter__elem filter__elem--label">From: </label>
								<input className="filter__elem filter__elem--input" type="date" value={this.state.from} min="2000-01-01" max={this.state.to} id="from" onChange={this.handleChange}/>
								<label className="filter__elem filter__elem--label">To: </label>
								<input className="filter__elem filter__elem--input" type="date" value={this.state.to} max={this.state.to} min={this.state.from} id="to" onChange={this.handleChange}/>
							</div>
							<div className="filter__wrapper">
								<button className={"filter__elem filter__elem--button " + (this.state.size === "_n" && "filter__elem--active")} onClick={this.handleSize} id="_n" >Small</button>
								<button className={"filter__elem filter__elem--button " + (this.state.size === "" && "filter__elem--active")} onClick={this.handleSize} >Medium</button>
								<button className={"filter__elem filter__elem--button " + (this.state.size === "_b" && "filter__elem--active")} onClick={this.handleSize} id="_b" >Large</button>
							</div>
						</div>
	      	</details>
      		<ImageBlock 
      			request={this.props.request}  
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
