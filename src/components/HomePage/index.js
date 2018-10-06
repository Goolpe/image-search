import React, { Component } from 'react';
import FilterBlock from '../FilterBlock';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs',
			error: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

//handling change of value input
	handleChange(e){
		let value = e.target.value
		this.setState({
			[e.target.id] : value,
			error: ""
		})
	}

//handling submit
	handleSubmit(e){
		e.preventDefault();
		if (/^\s+$/.test(this.state.inputText)) {
		  this.setState({
		  	error: "Please write something"
		  })
		}
		else{
			this.setState({
				input: this.state.inputText.toLowerCase().trim()
			})
		}
	}

	render() {
    return (
      <main className="main">
      	<header className="header">
      		<h1 className="header__title">Search photos</h1>
      	</header>
		    <form onSubmit={this.handleSubmit} className="form-search">
	      	<input className="form__input" value={this.state.inputText} id="inputText" onChange={this.handleChange} placeholder="Dogs" required/>
	      	<div className="form__error">{this.state.error}</div>
	      	<button className="form__button" type="submit">Search</button>
	    	</form>
	    	<section>
					<FilterBlock request={"flickr.photos.search&text=" + this.state.input} />
	    	</section>
      </main>
    );
	}
}

export default HomePage;
