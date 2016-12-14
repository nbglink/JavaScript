import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';

import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';

import KinveyRequester from './KinveyRequester';
import ListBooksView from './Views/ListBooksView';
import CreateBookView from './Views/CreateBookView';
import EditBookView from './Views/EditBookView';
import $ from 'jquery'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            userId: null

        };
    }

    render() {
        return (
            <div className="App">
                <header>
                    <NavigationBar
                        username={this.state.username}
                        homeClicked={this.showHomeView.bind(this)}
                        loginClicked={this.showLoginView.bind(this)}// <== == "NavigationBar buttons props" тук задаваме извикването на ункцията свързана със съответния кликнат бутон от NavigationBar "view-то"
                        //и bind-ваме this, за да вземем this-а na App, а не на бутона.
                        registerClicked={this.showRegisterView.bind(this)}
                        booksClicked={this.showBooksView.bind(this)}
                        createBookClicked={this.showCreateBookView.bind(this)}
                        logoutClicked={this.logout.bind(this)}

                    />

                    <div id="loadingBox">Loading ...</div>
                    <div id="infoBox">Info msg</div>
                    <div id="errorBox">Error messages</div>

                </header>
                <div id="main"></div>

                <Footer />
            </div>
        );
    }


    componentDidMount() {
        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: function () {
                $("#loadingBox").show()
            },
            ajaxStop: function () {
                $("#loadingBox").hide()
            }
        });

        // Attach a global AJAX error handler
        $(document).ajaxError(
            this.handleAjaxError.bind(this));

        //LOad state
        this.setState({
            username: sessionStorage.getItem("username"),
            userId: sessionStorage.getItem("userId")

        });

        this.showHomeView();

        $('#errorBox', '#infobox').click(function () { $(this).hide() })

    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }


    showView(reactComponent) {
        ReactDOM.render(
            reactComponent,
            document.getElementById('main')
        );
        $('#errorBox').hide();

    }


    showHomeView() {
        this.showView(<HomeView username={this.state.username}/>); //подава се username state на HomeView компонента.
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>);

    }

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));


        function loginSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showInfo("Login successful");
            this.showBooksView();
        }
    }



    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        });
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)}/>);
    }

    register(username, password) {
        KinveyRequester.registerUser(username, password)
            .then(registerSuccess.bind(this));


        function registerSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showInfo("Register successful");
            this.showBooksView();
        }
    }

    showBooksView() {
        KinveyRequester.loadBooks()
            .then(loadBooksSuccess.bind(this));


        function loadBooksSuccess(books) {
            this.showInfo("Books loaded.");
            this.showView(<ListBooksView
                books={books}
                onedit={this.loadBookForEdit.bind(this)}
                ondelete={this.loadBookForDelete.bind(this)}
            />
            );
        }
    }

    loadBookForEdit(bookId){
        KinveyRequester.findBookById(bookId)
            .then(findBookSuccess.bind(this));
        
        function findBookSuccess(book) {
            let editBookView = <EditBookView
                bookId={book._id}
                title={book.title}
                author={book.author}
                description={book.description}
                onsubmit={this.editBook.bind(this)}

            />;
            this.showView(editBookView);
        }
    }

    loadBookForDelete(bookId){
        alert(bookId)
        //this.showView(<EditBookView onedit={this.editBook.bind(this)}/>)
    }


    showCreateBookView() {
        this.showView(<CreateBookView
            onsubmit={this.createBook.bind(this)}/>)
    }

    createBook(title, author, description) {
        KinveyRequester.createBook(title, author, description)
            .then(createBooksSuccess.bind(this));


        function createBooksSuccess() {
            this.showInfo("Book created.");
            this.showBooksView();
        }
    }

    editBook(bookId, title, author, description) {
        KinveyRequester.editBook(bookId, title, author, description)
            .then(editBooksSuccess.bind(this));


        function editBooksSuccess() {
            this.showInfo("Book edited.");
            this.showBooksView();
        }
    }







    logout() {
        sessionStorage.clear();
        // This will update the entire app UI (e.g. the navigation bar)
        this.setState({
            username: null,
            userId: null
        });
        this.showHomeView();
    }


}


