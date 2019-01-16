import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Routes from "./routes";

export class App extends Component {

    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <div>
                    <Router>
                       <Route component={Routes}/>
                    </Router>
                </div>
            </Provider>
        )
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;