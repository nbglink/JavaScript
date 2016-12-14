import React from 'react';
import './Table.css';

let Table = React.createClass({

    delete : function () {
        if(this.props.ondelete)
            this.props.ondelete();
    },
    render: function () {

        let component = this;

        let titles = this.props.columns.map(function(col, c) {
            return <th key={c}>{col}</th>
        });

        let rows = this.props.rows.map(function(row, r) {
            return <tr key={r}>{row.map(function(cell, c) {
                return <td key={c}>{cell}</td>
            })}
                <td><button onClick={component.delete}>[Delete]</button></td>
            </tr>
        });

        return <table>
            <thead><tr>{titles}<th>Actions</th></tr></thead>
            <tbody>{rows}</tbody>
        </table>
    }
});

export default Table;
