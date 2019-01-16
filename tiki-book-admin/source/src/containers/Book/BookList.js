import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

import {Creators as BookListCreators} from "../../store/book/list";
import {Creators as BookDeleteCreators} from "../../store/book/delete";


function timeFromNow(time, noSuffix) {
    return time ? moment(time).fromNow(noSuffix) : null;
}

const BusyWaiting = () => <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75}
         aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}}/>
</div>;

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 50,
            offset: 0,
            order: ["updatedTime DESC", "createdTime DESC"]
        }
    }

    componentDidMount() {
        this.doLoadBooks(false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.createdBook && this.props.createdBook !== prevProps.createdBook)
            || this.props.updatedBook && this.props.updatedBook !== prevProps.updatedBook
        ) {
            this.doLoadBooks(false);
        }

        if (this.props.bookDeleted && this.props.bookDeleted !== prevProps.bookDeleted) {
            this.doLoadBooks(false);
            toast.success("Delete book successfully!");
        }

        if (this.props.error && this.props.error !== prevProps.error) {
            toast.error(this.props.error.details.message);
        }
    }

    handleDelete = (bookId) => (e) => {
        this.props.dispatch(BookDeleteCreators.request({id: bookId}));
    };

    loadBooks = (loadMore) => {
        this.props.dispatch(BookListCreators.request({
            "limit": this.state.limit,
            "offset": this.state.offset,
            "order": this.state.order,
            loadMore
        }));
    };

    doLoadBooks = (loadMore) => {
        if (loadMore) {
            this.setState(
                {
                    offset: this.state.offset + this.state.limit,
                },
                () => {
                    this.loadBooks(true);
                }
            );
        } else {
            this.setState(
                {
                    offset: 0,
                },
                () => {
                    this.loadBooks(false);
                }
            );
        }

    };

    loadMoreBooks = () => {
        this.doLoadBooks(true);
    };

    render() {
        const {request, books, hasMore} = this.props;
        return <div>
            {request && <BusyWaiting/>}
            <h2>Books <Link to={{
                pathname: "/books/create",
                state: {modal: true}
            }}>
                <button type="button" className={"btn btn-sm btn-info"}>Create</button>
            </Link></h2>


            {books && books.length > 0 ? <div className={"table-responsive mt-3"}>
                <table className={"table table-striped"}>
                    <thead className={"thead-light"}>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td></td>
                    </tr>
                    </thead>

                    <tbody>
                    {books.map((book, idx) => <tr key={idx}>
                        <td>
                            <Link to={{
                                pathname: `/books/${book.id}/edit`,
                                state: {modal: true}
                            }}>{book.title}</Link>
                        </td>
                        <td>
                            <p>{book.description ? book.description : "No description"}</p>
                        </td>
                        <td>
                            <span>{timeFromNow(book.createdTime)}</span>
                            <span className="dropdown ml-2">
                                <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenu2"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item" type="button">View</button>
                                    <button className="dropdown-item" type="button"
                                            onClick={this.handleDelete(book.id)}>Delete</button>
                                </div>
                            </span>
                        </td>

                    </tr>)}
                    </tbody>

                </table>


                {hasMore && <div className={"text-center mb-3"}>
                    <button className={"btn"} onClick={this.loadMoreBooks}>SHOW MORE</button>
                </div>}
            </div> : <div>No books available</div>}

        </div>
    }
}

function mapStateToProps(state, props) {
    return {
        books: state.book.list.items,
        request: state.book.list.request,
        error: state.book.list.error || state.book.delete.error,
        hasMore: state.book.list.hasMore,
        createdBook: state.book.create.createdBook,
        updatedBook: state.book.update.updatedBook,
        bookDeleted: state.book.delete.bookDeleted,
    }
}

export default connect(mapStateToProps)(BookList);