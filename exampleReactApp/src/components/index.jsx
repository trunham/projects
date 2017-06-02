/**
 * Base Application File
 * @description Wrapper template for any requested components
 * @author Todd Runham
 */

import React, { Component }         from 'react';
import Header                       from './common/header';
import { RouteHandler }             from 'react-router';
import Sidebar                      from './common/sidebar';
import { Link }                     from 'react-router';

export default class BaseComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            type: 'User'
        };
    }

    render() {
            return (
                <div className="full-screen sirius-activate-styles">
                    <div id="main-interface" className={`full-screen`}>
                        <div className="row col-reset-margin row-no-overflow">
                            <div id="sidebar" className="sidebar float-left full-screen bg-primary-mid">
                                <Sidebar type={this.state.type} />
                            </div>
                            <div id="main" className="full-screen float-right">
                                <div className="col s12 col-reset-padding">
                                    <div className="row col-reset-margin row-no-overflow">
                                        <Header type={this.state.type} />
                                    </div>
                                    <div className="row col-reset-margin">
                                        <div id="content" className="float-left bg-primary-lightest-alt-2">
                                            <RouteHandler />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}
