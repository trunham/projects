/**
 * Server
 * @description Handles the initial request, application management is then handed to the client
 * @author Todd Runham
 */


// Imports
// =====================================================================================================================

import express              from 'express';
import React                from 'react';
import Router               from 'react-router';
import routes               from './routes';
import { renderToString }   from 'react-dom/server';
import Application          from '../src/components';
import { exec }             from 'child_process';
import bodyParser           from 'body-parser';
import busboy               from 'connect-busboy';
import hbs                  from 'express-handlebars';

// Initialise Express & Redux, and load in the initial application data
// =====================================================================================================================

const uuid  = require('node-uuid');
const app   = express();
app.engine('html', hbs({ extname: 'html' }));
app.set('view engine', 'html');
app.locals.settings['x-powered-by'] = false;


// Middleware
// =====================================================================================================================

function router (req, res, next) {
    let context = {
        routes: routes, location: req.url
    };
    Router.create(context).run(function ran (Handler, state) {
        res.render('layout', {
            reactHtml: React.renderToString(<Handler />)
        });
    });
}

// API Routes
// ====================================================

app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(busboy());

// Disable Nagle algorithm
app.use(function(req,res,next){
    req.connection.setNoDelay(true);
    next();
});

app.use(express.static('assets'));
app.use(router);

export default app;
