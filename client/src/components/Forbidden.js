import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error extends Component {
    render() {
        return (
            <div className='wrap'>
                <h2>Forbidden</h2>
                <p>Access denied</p>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}