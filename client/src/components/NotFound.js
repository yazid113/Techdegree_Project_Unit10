import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error extends Component {
    render () {
        return (
            <div className='wrap'>
                <h2>404 Not Found</h2>
                <p>THe page your are looking for is not there return home and try another</p>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}