import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {Creators as BookListCreators} from "../../store/book/list";

const BusyWaiting = () =>  <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
</div>;

class BookList extends React.Component {
    componentDidMount() {
        this.props.dispatch(BookListCreators.request({
            "limit": 5,
            "offset": 0
        }));
    }

    render() {
        const {request, books} = this.props;

        return <div>
            {request && <BusyWaiting/>}
            <h2>Books</h2>
            <Link to={"/books/create"}><button type="button" className={"btn btn-secondary"}>Create</button></Link>

            {books && books.length > 0 ? <div className={"table-responsive mt-3"}>
                <table className={"table table-striped"}>
                    <thead className={"thead-light"}>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Actions</td>
                    </tr>
                    </thead>

                    <tbody>
                    {books.map((book, idx) => <tr key={idx}>
                        <td>
                            <Link to={`/books/${book.id}/edit`}>{book.title}</Link>
                        </td>
                        <td>{book.description}</td>
                        <td>Delete</td>
                    </tr>)}
                    </tbody>

                </table>
            </div> : <div>No books available</div>}

        </div>
    }
}

function mapStateToProps(state, props) {
    return {
        books: state.book.list.items,
        request: state.book.list.request,
        error: state.book.list.error,
    }
}

export default connect(mapStateToProps)(BookList);