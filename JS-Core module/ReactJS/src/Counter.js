import React from 'react';
import './Counter.css';

let Counter = React.createClass({
    getInitialState: function () {
        return {
            count: +this.props.start,
            style: {color:'blue'}
        };
    },
    increase: function () {
        this.setState({
            count: this.state.count + 1,
            style: {color:"green"}
        });
    },

    decrease: function () {
        this.setState({
            count: this.state.count - 1,
            style: {color:"red"}
        });
    },

    render: function () {
        return <div className="counter">Count:&nbsp;
            <b style={this.state.style}>
            {this.state.count}
            </b>&nbsp;
            <button type="button" onClick={this.increase}> + </button>
            <button type="button" onClick={this.decrease}> - </button>
            <button type="button">Color:</button>
        </div>;
    }
});

export default Counter;
