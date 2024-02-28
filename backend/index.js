require('dotenv').config();
const jsonUtil = require("./src/utils/json.express.util");
const routeUtil = require("./src/utils/route.express.util");
const routes = require("./src/routes/index.route");
// const { startMongoDBDatabase } = require('./src/utils/db.util');
const cors = require('cors');
const express = require("express");
const { startServerWithNotificationOffreSpecial } = require('./src/utils/notificationoffrespecial.util');
const { getMongoDBDatabase } = require('./src/utils/db.util');
const app = express();
require('moment/locale/fr');

app.use(cors());
const port = process.env.PORT|| 3000;

jsonUtil.enableJson(app, express);
routeUtil.setStaticFolder(app, express, 'public');
routeUtil.loadRoutes(app, routes);

// (async () => {
//     await startMongoDBDatabase();
//     app.listen(port, () => console.log("Listening on port", port, "..."));
// })();

(async () => {
    const db = await getMongoDBDatabase();
    startServerWithNotificationOffreSpecial(app, port, db);
})();
