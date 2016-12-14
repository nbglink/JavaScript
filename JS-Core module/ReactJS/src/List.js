import React from 'react';
import './List.css';

let List = React.createClass({
    render: function () {
        let items = [];
        let count = 0;
        for (let item of this.props.items) {
            items.push(<li className="list" key={++count}>{item}</li>)
        }
        return <ul>{items}</ul>;
    }
});

export default List;
