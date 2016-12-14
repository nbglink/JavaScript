import React, { Component } from 'react';
import Header from './Components/Common/Header';
import {Link} from 'react-router'
import observer from './Models/observer'
import {logout} from './Models/user'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            username: ''
        };
        this.onSessionUpdate = this.onSessionUpdate.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        observer.onSessionUpdate = this.onSessionUpdate;
        this.checkUserCredentials();
    }

    onSessionUpdate(){
        this.checkUserCredentials();
    }

    checkUserCredentials() {
        let username = sessionStorage.getItem('username');
        if(!username){
            this.setState({
                loggedIn: false
            })
        } else{
            this.setState({
                loggedIn: true,
                username:username
            })
        }
    }

    onLogout() {
        this.checkUserCredentials();
    }

  render() {
        if(this.state.loggedIn) {
            return (
                <div className="container">
                    <Header loggedIn={this.state.loggedIn} username={this.state.username}>
                        <Link to="/" className="btn btn-default">Home</Link>
                        <Link to="/catalog" className="btn btn-default">Catalog</Link>
                        <Link to="/about" className="btn btn-default">About</Link>
                        <Link to="" className="btn btn-default" onClick={() => logout(this.onLogout)}>Logout</Link>
                    </Header>
                    {this.props.children}
                </div>
            );
        }
    return (
      <div className="container">
          <Header loggedIn={this.state.loggedIn} username={this.state.username}>
              <Link to="/" className="btn btn-default">Home</Link>
              <Link to="/about" className="btn btn-default">About</Link>
              <Link to="/login" className="btn btn-default">Login</Link>
              <Link to="/register" className="btn btn-default">Register</Link>
          </Header>
          {this.props.children}
      </div>
    );
  }
}

export default App;
