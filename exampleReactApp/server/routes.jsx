/**
 * Routes
 * @description Application Paths
 * @author Todd Runham
 */

import React                    from 'react';
import {Route, DefaultRoute}    from 'react-router';
import Main                     from '../src/components';
import Dashboard                from '../src/components/dashboard';

export default (
    <Route path='/' handler={Main}>
        <DefaultRoute handler={Dashboard} />
    </Route>
);
