/**
 * Sidebar
 * @description Sidebar menu component
 * @author Todd Runham
 */

import React, { Component } from 'react';
import { Link }             from 'react-router';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col s12 txt-white">
                    <div className="row col-reset-margin menu-item">
                        <div className="col s12 margin-top-60">
                            <div className="row sidebar-border position-relative">
                                <div className="float-left" style={{width: '20%'}}>
                                    <div className="profile-container">
                                        <img src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13934723_10154460014606340_7819781554885998939_n.jpg?oh=75553c1762522c8fea4dbad24e224980&oe=59738174"/>
                                    </div>
                                </div>
                                <div className="float-left margin-bottom-30" style={{width: '80%'}}>
                                    <h4 className="strong margin-left-15 float-left">Todd<br/>Runham</h4>
                                    <div className="float-right margin-top-30">
                                        <Link to="/settings" className="txt-white">
                                            <i className="material-icons">mode_edit</i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row col-reset-margin menu-item">
                        <div className="col s12 col-reset-padding">
                            <div className="padding-top-7 padding-left-15 padding-right-30 float-left margin-top-30">
                                <div className="float-left margin-right-30"><i className="material-icons">dashboard</i></div>
                                <Link to="/"><p className="sirius-title float-left small txt-white ">Dashboard</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
