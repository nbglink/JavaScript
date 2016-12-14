import React, {Component} from 'react';
import './Team.css';
import {Link} from 'react-router';
export default class Team extends Component {
    render(){
        return (
            <div className="team-box">
                <span className="spanner">Name</span>
                <span>{this.props.name}</span>
                <span className="spanner">Description</span>
                <p>{this.props.description || "No description"}</p>
                <span className="spanner">Managment</span>
                <Link to={"/edit/" + this.props.teamId} className="btn btn-default">Edit</Link>
            </div>
        )
    }
}