import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import VisibilitySensor from 'react-visibility-sensor';

import {Creators as BookListCreators} from "../../store/book/list";

const defaultTabClass = "nav-link";
const activeTabClass = "nav-link active";

const BusyWaiting = () => (<div className="d-flex justify-content-center mt-3">
    <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>
</div>);

const Tab = ({value, currentValue, handleChangeTab, children}) => (
    <li className="nav-item" onClick={handleChangeTab(value)}>
        <a className={value === currentValue ? activeTabClass : defaultTabClass}
           href="">{children}</a>
    </li>
);

export class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: "landing",
            limit: 5,
            offset: 0,
        }
    }

    componentDidMount() {
        this.doLoadBooks(false);
    }

    handleChangeTab = value => (event) => {
        event.preventDefault();
        if (value !== this.state.currentTab) {
            this.setState({
                currentTab: value
            });
        }
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

    handleEndingSensor = (isVisible) => {
        if (isVisible && !this.props.request && this.props.hasMore) {
            this.loadMoreBooks();
        }
    };

    render() {
        const {currentTab} = this.state;
        const {books, request} = this.props;

        return (<div>
            <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                    <Tab value={"landing"} currentValue={currentTab} handleChangeTab={this.handleChangeTab}>
                        Home
                    </Tab>

                    <Tab value={"action"} currentValue={currentTab} handleChangeTab={this.handleChangeTab}>
                        Action
                    </Tab>

                    <Tab value={"horror"} currentValue={currentTab} handleChangeTab={this.handleChangeTab}>
                        Horror
                    </Tab>

                    <Tab value={"romance"} currentValue={currentTab} handleChangeTab={this.handleChangeTab}>
                        Romance
                    </Tab>

                    <Tab value={"western"} currentValue={currentTab} handleChangeTab={this.handleChangeTab}>
                        Western
                    </Tab>
                </ul>
            </div>

            {request && <BusyWaiting/>}

            {books && books.length > 0 && <React.Fragment>
                <div className={"row m-1"}>
                    {books.map((book, idx) => <div className={"col-12 col-sm-6 col-md-3 p-2"} key={idx}>
                        <div className="card">
                            <Link to={`/books/${book.id}`}>
                                <img src={book.cover || "https://source.unsplash.com/random"} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title text-truncate" title={book.title}>{book.title}</h5>
                                </div>
                            </Link>

                        </div>
                    </div>)}
                </div>

                <VisibilitySensor onChange={this.handleEndingSensor}>
                    <div style={{visibility: 'hidden'}}>SHOW MORE</div>
                </VisibilitySensor>
            </React.Fragment>}
        </div>)
    }
}

function mapStateToProps(state, props) {
    return {
        books: state.book.list.items,
        request: state.book.list.request,
        hasMore: state.book.list.hasMore,
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));