/**
 * Dashboard
 * @description Dashboard component
 * @author Todd Runham
 */

import React, { Component } from 'react';

export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <div className="row col-reset-margin">
                    <div className="row col-reset-margin">
                        <div className="col s12">
			     Header
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
