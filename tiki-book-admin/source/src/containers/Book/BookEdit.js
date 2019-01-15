import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {Creators as BookDetailCreators} from "../../store/book/detail";
import {Creators as BookUpdateCreators} from "../../store/book/update";

import BookForm from "./BookForm";

const BusyWaiting = () =>  <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
</div>;

class BookEdit extends React.Component {
    componentDidMount() {
        if (this.props.bookId) {
            this.props.dispatch(BookDetailCreators.request({id: this.props.bookId}));
        }
    }

    handleSubmit = (values) => {
        this.props.dispatch(BookUpdateCreators.request(values));
    };

    render () {
        const {request, book} = this.props;
        const busy = Boolean(request);

        return <div>
            {request && <BusyWaiting/>}
            <h2>Change Book</h2>

            <BookForm onSubmit={this.handleSubmit} initialValues={book} busy={busy}/>
        </div>
    }
}

function mapStateToProps(state, props) {
    return {
        bookId: props.match.params.id,
        request: state.book.detail.request || state.book.update.request,
        error: state.book.detail.error || state.book.update.error,
        book: state.book.detail.book,
    }
}

export default withRouter(connect(mapStateToProps)(BookEdit));