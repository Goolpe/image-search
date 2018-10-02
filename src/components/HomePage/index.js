import React, { Component } from 'react';
import FilterBlock from '../FilterBlock';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs'
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className="container">
      	<h1>Search photos</h1>
      	<form onSubmit={this.handleSubmit} className="home_search">
	      	<input value={this.state.inputText} id="inputText" onChange={this.handleChange} placeholder="Dogs" required/>
	      	<button type="submit" >Search</button>
      	</form>
      	<FilterBlock method="flickr.photos.search" nid={"&text=" + this.state.input} />
      </div>
    );
  }
}

export default HomePage;
