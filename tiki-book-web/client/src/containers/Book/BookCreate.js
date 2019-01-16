import React from "react";
import {connect} from "react-redux";

import BookForm from "./BookForm";
import {Creators as BookCreateCreators} from "../../store/book/create";
import {toast} from "react-toastify";

const BusyWaiting = () =>  <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
</div>;

class BookCreate extends React.Component {

    handleSubmit = (values) => {
        console.log("@@ values", values);
        this.props.dispatch(BookCreateCreators.request(values));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.createdBook && this.props.createdBook !== prevProps.createdBook) {
            toast.success("Create book successfully!");
        }
        if (this.props.error && this.props.error !== prevProps.error) {
            toast.error(this.props.error.details.message);
        }
    }

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