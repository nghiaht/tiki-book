import React from "react";

import {Creators as BookDetailCreators} from "../../store/book/detail";
import {withRouter} from "react-router-dom";
import {connect }from "react-redux";

const BusyWaiting = () =>  <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
</div>;

class BookDetail extends React.Component {
    componentDidMount() {
        if (this.props.bookId) {
            this.props.dispatch(BookDetailCreators.request({id: this.props.bookId}));
        }
    }
    render () {
        const {book, request} = this.props;

        return (<div>
            {request && <BusyWaiting/>}

            <div className={"container-fluid"}>
                <h2>View Book</h2>


                {!request && (book ? <div>
                    <div className="card" style={{width: '18rem'}}>
                        <img src={book.cover || "https://source.unsplash.com/random"} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">{book.description}</p>
                        </div>
                    </div>
                </div> : <p>Book not available</p>)}
            </div>
        </div>)
    }
}

function mapStateToProps(state, props) {
    return {
        bookId: props.match.params.id,
        request: state.book.detail.request,
        error: state.book.detail.error,
        book: state.book.detail.book,
    }
}

export default withRouter(connect(mapStateToProps)(BookDetail));