import React, {Component} from 'react';
import Greeting from './Greeting'

export  default class Header extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Team Manager</h1>
                <Greeting loggedIn={this.props.loggedIn} username={this.props.username}/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}