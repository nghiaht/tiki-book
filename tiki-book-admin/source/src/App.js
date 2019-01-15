import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import BookList from "./containers/Book/BookList";
import BookCreate from "./containers/Book/BookCreate";
import BookEdit from "./containers/Book/BookEdit";

export default class App extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <Router>
                        <div>
                            <Route exact path={"/"} component={BookList}/>
                            <Route exact path={"/books"} component={BookList}/>
                            <Route exact path={"/books/create"} component={BookCreate}/>
                            <Route exact path={"/books/:id/edit"} component={BookEdit}/>
                        </div>


                    </Router>
                </div>
            </Provider>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};