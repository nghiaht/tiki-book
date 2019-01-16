import React from "react";

import Header from "./Header";
import './AppLayout.css'

export default class Layout extends React.Component {
    render() {
        const {children} = this.props;
        return <div className='container-fluid pl-0 pr-0'>
            <Header/>

            <div className={"mainContent"}>
                {children}
            </div>
        </div>
    }
}