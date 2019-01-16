import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top"
                         style={{backgroundColor: 'rgb(217, 217, 217)'}}>
                        <Link to={"/"} className="navbar-brand" style={{fontFamily: 'Tahoma'}}>
                            <h2 className={"font-weight-bold"}>Book Store</h2>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNavDropdown1"
                                aria-controls="navbarNavDropdown1" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown1">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
            </div>)
    }
}

export default Header;