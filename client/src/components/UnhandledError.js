import React, { Component } from 'react';

export default class Error extends Component {
    render () {
        return (
            <div className='wrap'>
                <h2>Unexpected Error</h2>
                <p>Looks like an Unexpected Error has occured.</p>
            </div>
        )
    }
}