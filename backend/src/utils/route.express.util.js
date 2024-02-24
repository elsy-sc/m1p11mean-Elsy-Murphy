const path = require('path');

function loadRoutes(app, routes) {
    if (!Array.isArray(routes)) routes = [routes];
    routes.forEach((route) => {
        if (process.env.APP_NAME) {
            app.use( '/' + process.env.APP_NAME, route);
        }
        else {
            app.use(route);
        }
    });
}

function getRouter(express, route, path){
    const router = express.Router();
    if (path) {
        router.use(path, route); 
        return router;
    }
    return route;
}

function setStaticFolder(app, express, folder) {
    app.use('/' + folder, express.static(path.join(process.cwd(), folder)));
}

exports.loadRoutes = loadRoutes;
exports.getRouter = getRouter;
exports.setStaticFolder = setStaticFolder;