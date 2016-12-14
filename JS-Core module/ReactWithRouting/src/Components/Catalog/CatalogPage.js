import React, {Component} from 'react';
import Team from './Team';
import {loadTeams} from '../../Models/team';


export  default class Catalog extends Component {
   constructor(props){
       super(props);
       this.state = {
           teams: []
       };
       this. onLoadSuccess = this.onLoadSuccess.bind(this);
   }

   componentDidMount() {
        loadTeams(this.onLoadSuccess);
   }

   onLoadSuccess(response){
        this.setState({ teams:response })
   }

    render() {
        return (
            <div>
                <h1>Catalog Page</h1>
                {this.state.teams.map((t, i) => {
                   return <Team key={i} name={t.name} description={t.description} teamId={t._id}/>
                })}
            </div>
        );
    }
}