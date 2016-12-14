import React, {Component} from 'react';
import EditForm from '../Create/CreateForm';
import {loadDetails, edit} from '../../Models/team';
//import observer from '../../Models/observer';

export  default class EditPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            inputDisabled: true
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this. onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        loadDetails(this.props.params.teamId, this.onLoadSuccess);
    }

    onLoadSuccess(response){
        this.setState({
            name: response.name,
            description: response.description,
            inputDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        if(event.target.name === "name") {
            if(event.target.value.length < 3){
                newState.inputDisabled = true;
            }else {
                newState.inputDisabled = false;
            }
            this.setState(newState)
        }

    }

    onSubmitHandler(event){
        event.preventDefault();
        if(this.state.name.length < 3){
            alert("Team name must be at least 3 characters long")
        } else {
            edit(this.props.params.teamId, this.state.name, this.state.description, this.onEditSuccess);
        }
    }

    onEditSuccess(result){
       this.context.router.push("/catalog");
    }

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <EditForm
                    name={this.state.name}
                    description={this.state.description}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSubmitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};