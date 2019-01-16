import React from "react";
import {connect} from "react-redux";

import BookForm from "./BookForm";
import {Creators as BookCreateCreators} from "../../store/book/create";
import {Creators as BookListCreators} from "../../store/book/list";

const BusyWaiting = () =>  <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
</div>;

class BookCreate extends React.Component {

    handleSubmit = (values) => {
        this.props.dispatch(BookCreateCreators.request(values));
    };


    render() {
        const {request} = this.props;

        return <div>
            {request && <BusyWaiting/>}
            <h2>Create Book</h2>
            <BookForm onSubmit={this.handleSubmit} initialValues={{
                cover: "https://source.unsplash.com/random"
            }}/>
        </div>
    }
}

function mapStateToProps(state, props) {
    return {
        createdBook: state.book.create.createdBook,
        request: state.book.create.request,
        error: state.book.create.error,
    }
}

export default connect(mapStateToProps)(BookCreate);