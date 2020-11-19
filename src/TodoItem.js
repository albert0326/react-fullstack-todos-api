import React, {Component} from "react";

class TodoItem extends Component {
	render(){
		const {name, completed, onDelete, onToggle} = this.props;
		return(
			
				<li>
				<span	
					style={{textDecoration: completed ? "line-through" : "none"}}
					onClick={onToggle}
				>
					{name}
				</span>
				<span onClick={onDelete}> X</span>
				</li>
		)
	}
}

export default TodoItem;