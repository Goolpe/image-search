import React, { Component } from 'react';
import './filterBlock.css';

const API = 'https://api.flickr.com/services/rest/?method=';
const API_KEY = '&api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1';

class FilterBlock extends Component {
	constructor(props){
		super(props);
		this.state={
			licenses: [],
		}
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
			      		<select value={this.props.licenseFilter} className="filter__elem filter__elem--select" id="licenseFilter" onChange={this.props.handleChange}>
			      			<option value="">All</option>
						    	{LICENSES_LIST}
								</select>
							</div>
							<div className="filter__wrapper">
								<label className="filter__elem filter__elem--label">From: </label>
								<input className="filter__elem filter__elem--input" type="date" value={this.props.from} min="2000-01-01" max={this.props.to} id="from" onChange={this.props.handleChange}/>
								<label className="filter__elem filter__elem--label">To: </label>
								<input className="filter__elem filter__elem--input" type="date" value={this.props.to} max={this.props.to} min={this.props.from} id="to" onChange={this.props.handleChange}/>
							</div>
							<div className="filter__wrapper">
								<button className={"filter__elem filter__elem--button " + (this.props.size === "_n" && "filter__elem--active")} onClick={this.props.handleSize} id="_n" >Small</button>
								<button className={"filter__elem filter__elem--button " + (this.props.size === "" && "filter__elem--active")} onClick={this.props.handleSize} >Medium</button>
								<button className={"filter__elem filter__elem--button " + (this.props.size === "_b" && "filter__elem--active")} onClick={this.props.handleSize} id="_b" >Large</button>
							</div>
						</div>
	      	</details>
      	</React.Fragment>
    );
  }
}

export default FilterBlock;
