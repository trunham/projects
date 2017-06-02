/**
 * Client
 * @description Handles the application after the initial load by the server
 * @author Todd Runham
 */

import React                from 'react';
import ReactDOM           from 'react-dom';
import Application          from '../src/components';
import Router               from 'react-router';
import routes               from '../server/routes';

Router.run(routes, Router.HistoryLocation, function ran (Handler, state) {
    ReactDOM.render(<Handler />, document.getElementById('index'));
});
