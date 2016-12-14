import React from 'react';

export default function ListBooksView(props) {

    let tableRows = props.books.map(book =>
        <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
            {getBookActions(book)}
        </tr>
    );

    function getBookActions(book) {
        if (book._acl.creator === sessionStorage.getItem("userId")) {
            return <td>
                <button onClick={props.onedit.bind(this, book._id)}>Edit</button>
                <button onClick={props.ondelete.bind(this, book._id)}>Delete</button>
            </td>
        }
        else {
            return <td></td>
        }
    }

    return (
        <div className="books-view">
            <h1>Books</h1>
            <table className="books-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableRows}
                </tbody>
            </table>
        </div>
    );
}

