/**
 * Header
 * @description The header bar for all sirius interfaces
 * @author Todd Runham
 */

import React, { Component } from 'react';
import { Link }             from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: true,
            menu: null,
            User: [
                {
                    name: 'Dashboard',
                    link: '/'
                }
            ]
        }
    }

    /**
 	* @description Loop through the available menu options depending on user type
    */
    componentDidMount() {
        let html = this.state[this.props.type].map((menu, index)=>{
            return (
                <div className="float-right margin-right-45">
                    <Link to={menu.link} className="txt-primary">
                        {menu.name}
                    </Link>
                </div>
            )
        })
        this.setState({
            menu: html
        })
    }

    render() {
        return (
            <div className="pull-top bg-white">
                <header>
                <div className="row col-reset-margin row-no-overflow">
                    <div className="col s12 l4 txt-tertiary-lighter">
                        <h5 className="txt-primary-light strong margin-top-7 float-left">
                            Example App
                        </h5>
                    </div>
                    <div className="col s12 l8 txt-tertiary-lighter margin-top-5">
                        <div className="float-right pointer">
                            <i className="material-icons txt-primary">notifications</i>
                        </div>
                        {this.state.menu}
                    </div>
                </div>
                    <div className="row col-reset-margin">
                        <div className="col s12 l4 txt-tertiary-lighter">
                            <h3 className="txt-primary-light strong margin-top-25 margin-bottom-5 float-left">
                                Dashboard
                            </h3>
                        </div>
                        <div className="col s12 l8 txt-tertiary-lighter margin-top-5">
                            <div className="float-right add-icon">
                                <i className="material-icons txt-white" style={{fontSize: '32px'}}>add</i>
                            </div>
                        </div>
                    </div>
            </header>
            </div>
        );
    }
}
