import React, { Component } from 'react';
import FilterBlock from '../FilterBlock';
import moment from 'moment';
import ImageBlock from '../ImageBlock';

class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			inputText: '',
			input: 'dogs',
			error: '',
			from: "2000-01-01",
			to: moment().format("YYYY-MM-DD"),
			licenseFilter: "",
		  size: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSize = this.handleSize.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		let value = e.target.value
		this.setState({
			[e.target.id] : value,
			error: ""
		})
	}

	handleSize(e){
		this.setState({
			size: e.target.id
		})
	}

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
					<FilterBlock 
						handleChange={this.handleChange} 
						handleSize={this.handleSize}
						from={this.state.from} 
						to={this.state.to} 
						license={this.state.licenseFilter} 
      			viewList={this.state.viewList}
      			size={this.state.size}
					/>
	    	</section>
	    	<section>
	    		<ImageBlock 
      			method="flickr.photos.search&text="
      			nid={this.state.input}  
      			license={this.state.licenseFilter} 
      			from={this.state.from}
      			to={this.state.to}
      			size={this.state.size}
      			/>	
      	</section>
      </main>
    );
	}
}

export default HomePage;
