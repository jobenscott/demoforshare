import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }


    delete() {
        axios.get('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => this.props.history.push('/'));
    }

}