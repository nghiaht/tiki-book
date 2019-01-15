import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import BookList from "./containers/Book/BookList";
import BookCreate from "./containers/Book/BookCreate";
import BookEdit from "./containers/Book/BookEdit";

const AdminLayout = ({children}) => <div className={"container-fluid"}>
    {children}
</div>

export default class App extends Component {
    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <div>
                    <Router>
                        <Switch>
                            <Route exact path={"/"} component={BookList}/>

                            <Router basename={"admin"}>
                                <AdminLayout>
                                    <Route exact path={"/"} component={BookList}/>
                                    <Route exact path={"/books"} component={BookList}/>
                                    <Route exact path={"/books/create"} component={BookCreate}/>
                                    <Route exact path={"/books/:id/edit"} component={BookEdit}/>
                                </AdminLayout>
                            </Router>

                            <Route component={() => <div className={"text-center"}>
                                <em>Not found!</em>
                                <br/>
                                <Link to={"/"}>Back</Link>
                            </div>}/>
                        </Switch>


                    </Router>


                </div>
            </Provider>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};