/***
 * @author:          Jamie Brown & Todd Runham
 * @createddate:     July 2015
 * @description:     Routes loops through the topmenu.JSON file and auto-generates the routing tree for the
 *                   menus and submenus
 */

define(
    [
        'react/addons',
        'react-router',
        'react-router/lib/BrowserHistory',
        'utilities/cookie',
        'json!utilities/json/content/generic/topmenu.json',
        'app',
        'modules/site/default'
    ],
    function(React, Router, BrowserHistory, Cookie, Sitemap, App, Default) {
        var { createRoutesFromReactChildren, Route } = Router;

        /**
         * @singleRouteParser: Processes a single route object
         * @param name
         * @param path
         * @param template
         */
        var singleRouteParser = function(name, path, template) {

            // process variable formats
            name = name.toLowerCase().replace(/ |\//g,'');
            var endPath = path.lastIndexOf('/');
            var finalPath = path.substring(endPath + 1);

            return <Route  name={name} path={path} component={Default} template={template} />;
        };

        /**
         * @nestedRouteParser: Processes a nested object of routes
         * @param name
         * @param path
         * @param submenu
         * @param template
         */
        var nestedRouteParser = function(name, path, submenu, template) {

            // process variable formats
            name = name.toLowerCase().replace(/ |\//g,'');
            var endPath = path.lastIndexOf('/');
            var finalPath = path.substring(endPath + 1).replace(/\//g,'');

            return <Route name={name} path={finalPath} component={Default} template={template}>{submenu}</Route>;
        };

        /**
         * @routeObjectParser:  Dynamically handles the generation of the routes by passing data to singleRouteParser
         *                      and nestedRouteParser which returns the actual route object, if a submenu is found
         *                      it calls itself to generate it
         * @param routes
         * @returns {Route}
         */
        var routeObjectParser = function(routes, routeID) {
            var routeObject;
            if(routes.submenu) {
            
                // If the route does have a submenu map it
                var submenu = routes.submenu.map(function(options, index) {

                    // build a new route ID by adding the new route to the old
                    var routeIDB = routeID + options.name;

                    if(options.submenu) {

                        // if this route has a submenu call this function again to map it
                        return routeObjectParser(options, routeIDB);

                    } else {

                        // return the single route
                        return singleRouteParser(routeIDB, options.link, options.template);

                    }

                });
                
                // If it had a submenu return the nested route object
                routeObject = nestedRouteParser(routeID, routes.link, submenu, routes.template);
                
            } else {
            
                // If the route does not have a submenu simply return it
                routeObject = singleRouteParser(routeID, routes.link, routes.template);
                
            }
            return routeObject;
        };

        /**
         * @generateRoutes: Initialises the route data and calls routeObjectParser, which dynamically generates
         *                  the full route object
         * @returns {*}
         */
        var generateRoutes = function(){
            return Sitemap.map(function(routes, mainIndex) {
                var routeID = routes.name;
                
                // retrieve full route object
                return routeObjectParser(routes, routeID);
                    
            });
        };

        /**
         * Wrapper for the routes, calls generateRoutes() to get the dynamic route data
         */
        var Tree = createRoutesFromReactChildren(
            <Route component={App}>
                {generateRoutes()}
            </Route>
        );

        /**
         * Runs the router and renders the paths react component in the callback.
         */
        Router.Router.run(Tree, BrowserHistory, null, function (errors, state) {
            Component = state.components[1];
            React.render(<Default template={state.branch[1].template} />, document.getElementById('index'));
        });

    }
);
