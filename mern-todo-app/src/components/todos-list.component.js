import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Todo = props => (
    <tr id={"todo-"+props.todo._id}>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)


export default class TodosList extends Component {




    constructor(props) {
        super(props);
        this.state = {
        	todos: [{
	            todo_description: '',
	            todo_responsible: '',
	            todo_priority: '',
	            todo_completed: false
        	}]
    	};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    delete() {
        axios.delete('http://localhost:4000/todos/delete/'+this.props.match.params.id)
                .then(res => this.props.history.push('/'));
    }


    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            	return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}