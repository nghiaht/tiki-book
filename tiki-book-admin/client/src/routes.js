import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import HomePage from "./containers/Home/HomePage";

import BookList from "./containers/Book/BookList";
import BookCreate from "./containers/Book/BookCreate";
import BookEdit from "./containers/Book/BookEdit";

import AppLayout from "./layouts/AppLayout";

import 'react-toastify/dist/ReactToastify.css';


class AdminLayout extends React.Component {

    render () {
        const {children} = this.props;
        return (<div className={"container-fluid"}>
            {children}
        </div>)
    }
}

/**
 * Display children component in a modal
 */
class Modal extends React.Component {

    back = e => {
        this.props.history.goBack();
    };


    componentDidMount() {
        // Prepare modal
        window.$('#appModal').modal();
        window.$('#appModal').on('hide.bs.modal', (e) => {
            this.back();
        })
    }

    render () {
        const {children, modal,} = this.props;
        return (<div>
            <div id="appModal" className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className={"container-fluid mt-3 mb-3"}>
                            {children}
                        </div>

                    </div>
                </div>
            </div>
            <br />
        </div>)
    }
}


/**
 * Separate into AdminRoutes for supporting modal mode
 */
export class AdminRoutes extends Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
        let {location} = this.props;

        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        const {location} = this.props;

        let isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        ); // not initial render

        return (
            <AdminLayout>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path={"/"} component={BookList}/>
                    <Route exact path={"/books"} component={BookList}/>
                    <Route exact path={"/books/create"} component={BookCreate}/>
                    <Route exact path={"/books/:id/edit"} component={BookEdit}/>
                </Switch>

                {isModal ? <Modal history={this.props.history}>
                    <Route path="/books/create" component={BookCreate} />
                    <Route path={"/books/:id/edit"} component={BookEdit}/>
                </Modal> : null}

                <ToastContainer autoClose={5000}/>
            </AdminLayout>
        )
    }
}

export class App extends Component {
    render() {

        return (
            <AppLayout>
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>

                    <Router basename={"admin"}>
                        <Route component={AdminRoutes}/>
                    </Router>

                    <Route component={() => <div className={"text-center"}>
                        <em>Not found!</em>
                        <br/>
                        <Link to={"/"}>Back</Link>
                    </div>}/>

                </Switch>
            </AppLayout>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default withRouter(App);