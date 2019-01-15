import React from "react";
import {connect} from "react-redux";

import {Creators as BookListCreators} from "../../store/book/list";

class BookList extends React.Component {
    componentDidMount() {
        this.props.dispatch(BookListCreators.request({
            "limit": 10,
            "offset": 0
        }));
    }

    render () {
        return <div>
            Book List
        </div>
    }
}

function mapStateToProps(state, props) {
    console.log('state', state);

    return {
        books: state.book.list.items,
        error: state.book.list.error,
    }
}

export default connect(mapStateToProps)(BookList);