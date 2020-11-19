import React, {Component} from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";


const URL = 'https://cors-anywhere.herokuapp.com/https://todoalbertapi.herokuapp.com/api/todos/';


class TodoList extends Component {
	constructor(props){
		super(props);
		this.state={
			todos:[]
		}
		this.addTodos= this.addTodos.bind(this)
	}
	
	componentDidMount(){
		this.LoadTodos()	
	}
	
	addTodos(newTodo){
		axios.post(URL, {
			name: newTodo
		  })
		.then(res => (
			this.setState({
				todos: [...this.state.todos, res.data]
			})
		))
		.catch(err => {
			if (err.response.status === 404) {
			  throw new Error(`${err.config.url} not found`);
			}
			throw err;
			});
	}
	
	deleteTodos(id){
		const deleteURL= URL + id;
		axios.delete(deleteURL)
		.then( ()=>{
			const todos= this.state.todos.filter(todo => todo._id !== id)
			this.setState({todos:todos})
		}
		)
		.catch(err => {
			if (err.response.status === 404) {
			  throw new Error(`${err.config.url} not found`);
			}
			throw err;
			});
		
	}
	
	toggleTodos(todo){
		const toggleURL= URL + todo._id;
		axios.put(toggleURL, {completed: !todo.completed})
		.then(response=>  {
			const todos= this.state.todos.map(t=> (t._id === response.data._id)? {...t, completed: !t.completed}: t);
			this.setState({todos:todos})
		})
		.catch(err => {
			if (err.response.status === 404) {
			  throw new Error(`${err.config.url} not found`);
			}
			throw err;
			});
	}
	
	LoadTodos(){
		axios.get(URL)
		.then(response => {
			this.setState({todos:response.data})
		}).catch(err => {
			if (err.response.status === 404) {
			  throw new Error(`${err.config.url} not found`);
			}
			throw err;
			});
	}
	
	
	render(){
		const {todos} = this.state;
		const TodoItems = todos.map(t=> (
			<TodoItem 
				key={t._id} {...t} 
				onDelete={this.deleteTodos.bind(this, t._id)}
				onToggle={this.toggleTodos.bind(this, t)}
				/>
		))
		return(
			<div className="TodoList">
				<h1>Todo App!</h1>
				<TodoForm addTodo={this.addTodos}/>
				{TodoItems}
			</div>
		)
	}
}

export default TodoList;