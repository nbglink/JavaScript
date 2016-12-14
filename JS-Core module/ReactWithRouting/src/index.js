import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import Home from './Components/Home/HomePage'
import Catalog from './Components/Catalog/CatalogPage'
import About from './Components/About/AboutPage'
import Register from './Components/Register/RegisterPage'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login/LoginPage'
import Create from './Components/Create/CreatePage'
import Edit from './Components/Edit/EditPage'

ReactDOM.render(
    <Router history={browserHistory}>
         <Route path="/" component={App}>
             <IndexRoute component={Home}/>
             <Route path="catalog" component={Catalog}></Route>
             <Route path="about" component={About}></Route>
             <Route path="register" component={Register}></Route>
             <Route path="login" component={Login}></Route>
             <Route path="create" component={Create}></Route>
             <Route path="edit/:teamId" component={Edit}></Route>
         </Route>
    </Router>,
    document.getElementById('root')
);
