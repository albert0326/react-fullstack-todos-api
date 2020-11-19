import React, {Component} from "react";


class TodoForm extends Component {
	constructor(props){
		super(props);
		this.state={
			inputValue: ""
		}
		this.handleChange= this.handleChange.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
	}
	
	handleChange(e){
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	handleSubmit(e){
		e.preventDefault();
		this.props.addTodo(this.state.inputValue);
		this.setState({
			inputValue:''
		})
	}
	
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.inputValue} onChange={this.handleChange} name="inputValue"/>
				<button>Save</button>
			</form>
		)
	}
}

export default TodoForm;